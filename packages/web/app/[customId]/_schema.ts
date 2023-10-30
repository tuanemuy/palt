import { z } from "zod";

export const getUserByCustomIdSchema = z.object({
  customId: z.string().min(1),
});

export const getPostsSchema = z.object({
  skip: z.number(),
  take: z.number(),
  orderBy: z.string().optional(),
  userId: z.string().cuid(),
  appUserId: z.string().cuid().optional(),
  tagIds: z.array(z.string().cuid()).optional(),
  text: z.string().optional(),
});

export const getPostSchema = z.object({
  id: z.string().cuid(),
});

export const getTagsSchema = z.object({ userId: z.string().cuid() });

export const ActionError = {
  NotFoundError: "not-found",
  DatabaseError: "database-error",
} as const;
export type ActionError = (typeof ActionError)[keyof typeof ActionError];
