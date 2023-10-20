import { z } from "zod";
import { OrderBy } from "core/profile";

export const getUserSchema = z.object({
  id: z.string().cuid(),
});

export const editUserSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .regex(/^[A-Za-z][a-zA-Z0-9]*/)
    .max(30),
  introduction: z.string().max(300).nullable(),
  thumbnail: z
    .object({
      key: z.string().min(1),
      mimeType: z.string().min(1),
    })
    .nullable(),
  orderBy: z.enum([OrderBy.CREATED, OrderBy.UPDATED]),
});

export const removeUserSchema = z.object({
  id: z.string().cuid(),
});

export const getPostsSchema = z.object({
  skip: z.number(),
  take: z.number(),
  orderBy: z.string().optional(),
  userId: z.string().cuid(),
  tagIds: z.array(z.string().cuid()).optional(),
  text: z.string().optional(),
});

export const getPostSchema = z.object({
  id: z.string().cuid(),
});

export const addPostSchema = z.object({
  userId: z.string().cuid(),
});

export const editPostSchema = z.object({
  id: z.string().cuid(),
  // userId: z.string().cuid(),
  body: z.string(),
  // tags: z.array(z.string().min(1)),
  isPublic: z.boolean(),
});

export const publishPostSchema = z.object({
  id: z.string().cuid(),
  isPublic: z.boolean(),
});

export const removePostSchema = z.object({ id: z.string().cuid() });

export const getTagsSchema = z.object({ userId: z.string().cuid() });

export const ActionError = {
  DuplicateNameError: "duplicate-name",
  DatabaseError: "database-error",
  S3Error: "s3-error",
} as const;
export type ActionError = (typeof ActionError)[keyof typeof ActionError];
