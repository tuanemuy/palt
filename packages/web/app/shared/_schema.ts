import { z } from "zod";

export const getPostSchema = z.object({
  id: z.string().cuid(),
});

export const editPostSchema = z.object({
  id: z.string().cuid(),
  body: z.string().optional(),
  isPublic: z.boolean().optional(),
});

export const cleanFilesOnPostSchema = z.object({
  postId: z.string().cuid(),
});

export const editPostTagsSchema = z.object({
  id: z.string().cuid(),
  userId: z.string().cuid(),
  tags: z.array(z.string().min(1)),
});

export const ActionError = {
  DuplicateNameError: "duplicate-name",
  NotFoundError: "not-found",
  DatabaseError: "database-error",
  S3Error: "s3-error",
  ImageConvesionError: "image-conversion-error",
} as const;
export type ActionError = (typeof ActionError)[keyof typeof ActionError];
