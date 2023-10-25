"use server";

import { z } from "zod";
import sharp from "sharp";
import mime from "mime";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { prisma } from "db";
import { FullPost, Post, FileOnPost } from "core/post";
import { File } from "core/file";
import {
  ActionError,
  getPostSchema,
  editPostSchema,
  cleanFilesOnPostSchema,
  editPostTagsSchema,
} from "./_schema";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export async function uploadFileOnPost(
  postId: string,
  name: string,
  body: Uint8Array,
  mimeType: string,
  maxWidth?: number
) {
  let converted;
  try {
    converted = await sharp(Buffer.from(body))
      .resize({
        width: maxWidth || undefined,
        withoutEnlargement: true,
      })
      .webp()
      .toBuffer();
  } catch (e) {
    console.error(e);
    return { fileOnPost: null, error: ActionError.ImageConvesionError };
  }

  const ext = mime.getExtension(mimeType);
  const key = `${postId}/${name}.${ext}`;
  const convertedKey = `${postId}/${name}.webp`;
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentLength: body.length,
  });
  const convertedCommand = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: convertedKey,
    Body: converted,
    ContentLength: converted.length,
  });

  try {
    await Promise.all([s3.send(command), s3.send(convertedCommand)]);
  } catch (e) {
    console.error(e);
    return { fileOnPost: null, error: ActionError.S3Error };
  }

  try {
    const fileOnPost = await prisma.fileOnPost.create({
      include: {
        file: {
          include: {
            assets: true,
          },
        },
      },
      data: {
        post: {
          connect: {
            id: postId,
          },
        },
        file: {
          create: {
            key,
            url: `/api/post/${postId}/file/${name}.{ext}`,
            mimeType,
            assets: {
              create: [
                {
                  label: `webp${maxWidth ? `@${maxWidth}` : ""}`,
                  key: convertedKey,
                  url: `/api/post/${postId}/file/${name}.webp`,
                  mimeType: "image/heic",
                },
              ],
            },
          },
        },
      },
    });

    return { fileOnPost, error: null };
  } catch (e) {
    console.error(e);
    return { fileOnPost: null, error: ActionError.DatabaseError };
  }
}

export async function cleanFilesOnPost(
  input: z.infer<typeof cleanFilesOnPostSchema>
) {
  let post: (Post & { files: (FileOnPost & { file: File })[] }) | null;
  try {
    post = await prisma.post.findUnique({
      include: {
        files: {
          include: {
            file: true,
          },
        },
      },
      where: {
        id: input.postId,
      },
    });
  } catch (e) {
    console.error(e);
    return { error: ActionError.DatabaseError };
  }

  if (!post) {
    return { error: ActionError.NotFoundError };
  }

  const tasks = post.files.map((fp) => {
    return (async () => {
      if (post && post.body.indexOf(fp.file.url) === -1) {
        try {
          const command = new DeleteObjectCommand({
            Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
            Key: fp.file.key,
          });
          s3.send(command);
        } catch (e) {
          console.error(e);
          // return { error: ActionError.S3Error };
        }

        try {
          const deleted = await prisma.file.delete({
            where: {
              id: fp.file.id,
            },
          });
        } catch (e) {
          console.error(e);
          return { error: ActionError.DatabaseError };
        }
      }
    })();
  });

  await Promise.all(tasks);

  return { error: null };
}

export async function getPost(input: z.infer<typeof getPostSchema>) {
  try {
    const post: FullPost | null = await prisma.post.findUnique({
      where: {
        id: input.id,
      },
      include: {
        user: true,
        tags: {
          include: {
            tag: true,
          },
        },
        accessibleUsers: {
          include: {
            user: true,
          },
        },
      },
    });
    return { post, error: null };
  } catch (e) {
    console.log(e);
    return { post: null, error: ActionError.DatabaseError };
  }
}

export async function editPost(input: z.infer<typeof editPostSchema>) {
  try {
    const post: Post = await prisma.post.update({
      where: {
        id: input.id,
      },
      include: {
        tags: {
          include: {
            tag: true,
          },
        },
      },
      data: {
        body: input.body,
        isPublic: input.isPublic,
      },
    });

    return { post, error: null };
  } catch (e) {
    console.error(e);
    return { post: null, error: ActionError.DatabaseError };
  }
}

export async function editPostTags(input: z.infer<typeof editPostTagsSchema>) {
  try {
    const post: Post = await prisma.post.update({
      where: {
        id: input.id,
      },
      data: {
        tags: {
          deleteMany: {},
          create: input.tags.map((t) => {
            return {
              tag: {
                connectOrCreate: {
                  where: {
                    userId_name: {
                      userId: input.userId,
                      name: t,
                    },
                  },
                  create: {
                    userId: input.userId,
                    name: t,
                  },
                },
              },
            };
          }),
        },
      },
    });

    await prisma.tag
      .deleteMany({
        where: {
          taggedPosts: {
            none: {},
          },
        },
      })
      .catch((e) => {
        console.error(e);
      });

    return { post, error: null };
  } catch (e) {
    console.error(e);
    return { post: null, error: ActionError.DatabaseError };
  }
}
