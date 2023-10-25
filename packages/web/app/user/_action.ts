"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import sharp from "sharp";
import mime from "mime";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { Prisma, prisma } from "db";
import { FullUser, User } from "core/user";
import {
  FullPost,
  Post,
  Tag,
  FileOnPost,
  AccessibleUserOnPost,
} from "core/post";
import { File } from "core/file";
import {
  ActionError,
  getUserSchema,
  editUserSchema,
  getPostsSchema,
  getPostSchema,
  addPostSchema,
  editPostSchema,
  cleanFilesOnPostSchema,
  addAccessibleUserSchema,
  editAccessibleUserSchema,
  removeAccessibleUserSchema,
  removePostSchema,
  getTagsSchema,
  editPostTagsSchema,
} from "./_schema";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export async function getUser(input: z.infer<typeof getUserSchema>) {
  try {
    const user: FullUser | null = await prisma.user.findUnique({
      where: {
        id: input.id,
      },
      include: {
        profile: {
          include: {
            thumbnail: {
              include: {
                assets: true,
              },
            },
          },
        },
      },
    });
    return { user, error: null };
  } catch (_e) {
    return { user: null, error: ActionError.DatabaseError };
  }
}

export async function editUser(input: z.infer<typeof editUserSchema>) {
  try {
    const user: FullUser = await prisma.user.update({
      include: {
        profile: {
          include: {
            thumbnail: {
              include: {
                assets: true,
              },
            },
          },
        },
      },
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        profile: {
          upsert: {
            create: {
              introduction: input.introduction,
              orderBy: input.orderBy,
              thumbnailId: input.thumbnailId,
            },
            update: {
              introduction: input.introduction,
              orderBy: input.orderBy,
              thumbnailId: input.thumbnailId,
            },
          },
        },
      },
    });

    revalidatePath("/user");

    return { user, error: null };
  } catch (e) {
    console.error(e);
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { user: null, error: ActionError.DuplicateNameError };
    } else {
      return { user: null, error: ActionError.DatabaseError };
    }
  }
}

export async function uploadPublicFile(
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
    return { file: null, error: ActionError.ImageConvesionError };
  }

  const ext = mime.getExtension(mimeType);
  const key = `public/${name}.${ext}`;
  const convertedKey = `public/${name}.webp`;
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
    return { file: null, error: ActionError.S3Error };
  }

  try {
    const file = await prisma.file.create({
      data: {
        key,
        url: `/api/file/${name}.{ext}`,
        mimeType,
        assets: {
          create: [
            {
              label: `webp${maxWidth ? `@${maxWidth}` : ""}`,
              key: convertedKey,
              url: `/api/file/${name}.webp`,
              mimeType: "image/heic",
            },
          ],
        },
      },
    });

    return { file, error: null };
  } catch (e) {
    console.error(e);
    return { file: null, error: ActionError.DatabaseError };
  }
}

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

export async function deleteFile(key: string) {
  const command = new DeleteObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: key,
  });

  try {
    await s3.send(command);
    await prisma.file.delete({
      where: {
        key,
      },
    });
    return { key, error: null };
  } catch (e) {
    console.error(e);
    return { key: null, error: ActionError.S3Error };
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

export async function getPosts(input: z.infer<typeof getPostsSchema>) {
  try {
    const posts: Post[] = await prisma.post.findMany({
      skip: input.skip,
      take: input.take,
      orderBy: {
        createdAt: input.orderBy === "createdAt" ? "desc" : undefined,
        updatedAt: input.orderBy === "updatedAt" ? "desc" : undefined,
      },
      where: {
        userId: input.userId,
        tags: input.tagIds
          ? {
              some: {
                tagId: {
                  in: input.tagIds,
                },
              },
            }
          : undefined,
        body: input.text
          ? {
              contains: input.text,
            }
          : undefined,
      },
    });

    const count = await prisma.post.count({
      where: {
        userId: input.userId,
        tags: input.tagIds
          ? {
              some: {
                tagId: {
                  in: input.tagIds,
                },
              },
            }
          : undefined,
        body: input.text
          ? {
              contains: input.text,
            }
          : undefined,
      },
    });

    return { posts, count, error: null };
  } catch (_e) {
    return { posts: null, count: 0, error: ActionError.DatabaseError };
  }
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

export async function addPost(input: z.infer<typeof addPostSchema>) {
  try {
    const post: Post = await prisma.post.create({
      data: {
        userId: input.userId,
        body: "",
      },
    });

    revalidatePath("/user");
    return { post, error: null };
  } catch (e) {
    console.error(e);
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

export async function addAccessibleUser(
  input: z.infer<typeof addAccessibleUserSchema>
) {
  let user: User | null;
  try {
    user = await prisma.user.findFirst({
      where: {
        AND: [
          {
            OR: [
              { email: { equals: input.targetEmailOrName } },
              { name: { equals: input.targetEmailOrName } },
            ],
          },
          { id: { not: input.ownerId } },
        ],
      },
    });
  } catch (e) {
    console.error(e);
    return {
      accessibleUser: null,
      error: ActionError.DatabaseError,
    };
  }

  if (!user) {
    return {
      accessibleUser: null,
      error: ActionError.NotFoundError,
    };
  }

  try {
    const accessibleUser: AccessibleUserOnPost & { user: User } =
      await prisma.accessibleUserOnPost.create({
        include: {
          user: true,
        },
        data: {
          postId: input.postId,
          userId: user.id,
          level: "read",
        },
      });

    return { accessibleUser, error: null };
  } catch (e) {
    console.error(e);
    return { accessibleUser: null, error: ActionError.DatabaseError };
  }
}

export async function editAccessibleUser(
  input: z.infer<typeof editAccessibleUserSchema>
) {
  try {
    const accessibleUser: AccessibleUserOnPost =
      await prisma.accessibleUserOnPost.update({
        include: {
          user: true,
        },
        where: {
          postId_userId: {
            postId: input.postId,
            userId: input.userId,
          },
        },
        data: {
          level: input.level,
        },
      });

    return { accessibleUser, error: null };
  } catch (e) {
    console.error(e);
    return { accessibleUser: null, error: ActionError.DatabaseError };
  }
}

export async function removeAccessibleUser(
  input: z.infer<typeof removeAccessibleUserSchema>
) {
  try {
    const accessibleUser: AccessibleUserOnPost =
      await prisma.accessibleUserOnPost.delete({
        include: {
          user: true,
        },
        where: {
          postId_userId: {
            postId: input.postId,
            userId: input.userId,
          },
        },
      });

    return { accessibleUser, error: null };
  } catch (e) {
    console.error(e);
    return { accessibleUser: null, error: ActionError.DatabaseError };
  }
}

export async function removePost(input: z.infer<typeof removePostSchema>) {
  try {
    const post: Post = await prisma.post.delete({
      where: input,
    });

    revalidatePath("/user");
    return { post, error: null };
  } catch (e) {
    console.error(e);
    return { post: null, error: ActionError.DatabaseError };
  }
}

export async function getTags(input: z.infer<typeof getTagsSchema>) {
  try {
    const tags: Tag[] = await prisma.tag.findMany({
      where: {
        userId: input.userId,
      },
    });

    return { tags, error: null };
  } catch (e) {
    console.error(e);
    return { tags: null, error: ActionError.DatabaseError };
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
