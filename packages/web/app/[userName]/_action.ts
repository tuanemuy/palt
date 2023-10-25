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
  getUserByNameSchema,
  getPostsSchema,
  getPostSchema,
  getTagsSchema,
} from "./_schema";

const s3 = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
  },
});

export async function getUserByName(
  input: z.infer<typeof getUserByNameSchema>
) {
  try {
    const user: FullUser | null = await prisma.user.findUnique({
      where: {
        name: input.name,
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
        isPublic: true,
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
        isPublic: true,
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
        isPublic: true,
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
