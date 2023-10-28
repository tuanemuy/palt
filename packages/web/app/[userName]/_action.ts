"use server";

import { z } from "zod";
import { S3Client } from "@aws-sdk/client-s3";
import { prisma } from "db";
import { FullUser } from "core/user";
import { FullPost, Post, Tag } from "core/post";
import {
  ActionError,
  getUserByNameSchema,
  getPostsSchema,
  getPostSchema,
  getTagsSchema,
} from "./_schema";

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
        user: {
          include: {
            profile: true,
          },
        },
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
        revisions: true,
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
        isPublic: true,
      },
    });

    return { tags, error: null };
  } catch (e) {
    console.error(e);
    return { tags: null, error: ActionError.DatabaseError };
  }
}
