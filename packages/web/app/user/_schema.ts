import { z } from "zod";
import { OrderBy } from "core/user";
import { AccessLevel } from "core/post";

export const getUserSchema = z.object({
  id: z.string().cuid(),
});

export const editUserSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .regex(/^[A-Za-z][a-zA-Z0-9]*/)
    .min(1)
    .max(30)
    .optional(),
  displayName: z.string().max(30).nullish(),
  introduction: z.string().max(300).nullish(),
  orderBy: z.enum([OrderBy.CREATED, OrderBy.UPDATED]).optional(),
  thumbnailId: z.string().cuid().nullish(),
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
  body: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export const removePostSchema = z.object({ id: z.string().cuid() });

export const restoreRevisionSchema = z.object({
  userId: z.string().cuid(),
  postId: z.string().cuid(),
  revisionId: z.string().cuid(),
  postBody: z.string(),
  revisionBody: z.string(),
});

export const cleanupPostSchema = z.object({
  postId: z.string().cuid(),
});

export const addAccessibleUserSchema = z.object({
  postId: z.string().cuid(),
  ownerId: z.string().cuid(),
  targetEmailOrName: z.string().min(1),
  level: z.enum([AccessLevel.READ, AccessLevel.EDIT]),
});

export const editAccessibleUserSchema = z.object({
  postId: z.string().cuid(),
  userId: z.string().cuid(),
  level: z.enum([AccessLevel.READ, AccessLevel.EDIT]),
});

export const removeAccessibleUserSchema = z.object({
  postId: z.string().cuid(),
  userId: z.string().cuid(),
});

export const getTagsSchema = z.object({ userId: z.string().cuid() });

export const editPostTagsSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  tags: z.array(z.string().min(1)),
});

export const editTagSchema = z.object({
  id: z.string().cuid(),
  isPublic: z.boolean().optional(),
});

export const ActionError = {
  DuplicateNameError: "duplicate-name",
  NotFoundError: "not-found",
  DatabaseError: "database-error",
  S3Error: "s3-error",
  ImageConvesionError: "image-conversion-error",
} as const;
export type ActionError = (typeof ActionError)[keyof typeof ActionError];
