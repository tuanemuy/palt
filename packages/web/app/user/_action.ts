"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getPublicUrl } from "util/s3";
import { Prisma, ReturnType, prisma } from "db";
import {
  ActionError,
  getUserSchema,
  editUserSchema,
  getPostsSchema,
  getPostSchema,
  addPostSchema,
  editPostSchema,
  publishPostSchema,
  removePostSchema,
  getTagsSchema,
} from "./_schema";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export type UserWithProfile = NonNullable<ReturnType<typeof getUser>["user"]>;

export async function getUser(input: z.infer<typeof getUserSchema>) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: input.id,
      },
      include: {
        profile: {
          include: {
            thumbnail: true,
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
    const user = await prisma.user.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        profile: {
          upsert: {
            where: {
              userId: input.id,
            },
            create: {
              introduction: input.introduction,
              orderBy: input.orderBy,
              thumbnail: input.thumbnail
                ? {
                    connectOrCreate: {
                      where: {
                        key: input.thumbnail.key,
                      },
                      create: {
                        ...input.thumbnail,
                        url: getPublicUrl(
                          process.env.NEXT_PUBLIC_AWS_REGION,
                          process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
                          input.thumbnail.key
                        ),
                      },
                    },
                  }
                : undefined,
            },
            update: {
              introduction: input.introduction,
              orderBy: input.orderBy,
              thumbnail: input.thumbnail
                ? {
                    connectOrCreate: {
                      where: {
                        key: input.thumbnail.key,
                      },
                      create: {
                        ...input.thumbnail,
                        url: getPublicUrl(
                          process.env.NEXT_PUBLIC_AWS_REGION,
                          process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
                          input.thumbnail.key
                        ),
                      },
                    },
                  }
                : undefined,
            },
          },
        },
      },
    });

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

export async function uploadThumbnail(key: string, body: Uint8Array) {
  const command = new PutObjectCommand({
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET,
    Key: key,
    Body: body,
    ContentLength: body.length,
  });

  try {
    await s3.send(command);
    return { key, error: null };
  } catch (e) {
    console.error(e);
    return { key: null, error: ActionError.S3Error };
  }
}

export async function deleteThumbnail(key: string) {
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

export type ListedPosts = NonNullable<ReturnType<typeof getPosts>["posts"]>;

export async function getPosts(input: z.infer<typeof getPostsSchema>) {
  try {
    const posts = await prisma.post.findMany({
      skip: input.skip,
      take: input.take,
      orderBy: {
        createdAt: input.orderBy === "createdAt" ? "desc" : undefined,
        updatedAt: input.orderBy === "updatedAt" ? "desc" : undefined,
      },
      where: {
        userId: input.userId,
        postTags: input.tagIds
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
        postTags: input.tagIds
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

export type SinglePost = NonNullable<ReturnType<typeof getPost>["post"]>;

export async function getPost(input: z.infer<typeof getPostSchema>) {
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: input.id,
      },
      include: {
        postTags: {
          include: {
            tag: true,
          },
        },
      },
    });
    return { post, error: null };
  } catch (_e) {
    return { post: null, error: ActionError.DatabaseError };
  }
}

export async function addPost(input: z.infer<typeof addPostSchema>) {
  try {
    const post = await prisma.post.create({
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
    const post = await prisma.post.update({
      where: {
        id: input.id,
      },
      include: {
        postTags: {
          include: {
            tag: true,
          },
        },
      },
      data: {
        body: input.body,
        isPublic: input.isPublic,
        /*
        postTags: {
          deleteMany: {},
          create: input.tags.map((t) => {
            return {
              tag: {
                connectOrCreate: {
                  where: {
                    userId: input.userId,
                    name: t,
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
        */
      },
    });

    return { post, error: null };
  } catch (e) {
    console.error(e);
    return { post: null, error: ActionError.DatabaseError };
  }
}

export async function publishPost(input: z.infer<typeof publishPostSchema>) {
  try {
    const post = await prisma.post.update({
      where: {
        id: input.id,
      },
      data: {
        isPublic: input.isPublic,
      },
    });

    return { post, error: null };
  } catch (e) {
    console.error(e);
    return { post: null, error: ActionError.DatabaseError };
  }
}

export async function removePost(input: z.infer<typeof removePostSchema>) {
  try {
    const post = await prisma.post.delete({
      where: input,
    });

    return { post, error: null };
  } catch (e) {
    console.error(e);
    return { post: null, error: ActionError.DatabaseError };
  }
}

export async function getTags(input: z.infer<typeof getTagsSchema>) {
  try {
    const tags = await prisma.tag.findMany({
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
