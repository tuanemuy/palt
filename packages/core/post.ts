import { format } from "date-fns";
import {
  User,
  Profile,
  Post,
  Revision,
  Tag,
  TagOnPost,
  AccessibleUserOnPost,
  File,
  FileOnPost,
  Asset,
} from "db";

export type { Post, Revision, Tag, AccessibleUserOnPost, FileOnPost } from "db";

export type FullPost = Post & {
  user: User & {
    profile:
      | (Profile & { thumbnail: (File & { assets: Asset[] }) | null })
      | null;
  };
  tags: (TagOnPost & {
    tag: Tag;
  })[];
  accessibleUsers: (AccessibleUserOnPost & {
    user: User;
  })[];
  revisions: Revision[];
};

export type AccessibleUser = AccessibleUserOnPost & { user: User };

export const AccessLevel = {
  READ: "read",
  EDIT: "edit",
} as const;
export type AccessLevel = (typeof AccessLevel)[keyof typeof AccessLevel];

export function accessLevelToString(accessLevel: AccessLevel) {
  switch (accessLevel) {
    case AccessLevel.READ:
      return "閲覧";
    case AccessLevel.EDIT:
      return "編集";
    default:
      return "不明";
  }
}

export function stringToAccessLevel(str: string) {
  switch (str) {
    case "read":
      return AccessLevel.READ;
    case "edit":
      return AccessLevel.EDIT;
    default:
      return null;
  }
}

export function extractDescription(body: string): string {
  return body
    .replace(/\r?\n/g, "")
    .replace(/(<([^>]+)>)/gi, "")
    .trim()
    .slice(0, 200);
}

export function extractTitle(post: FullPost | Post): string {
  const h1 = post.body.match(/<h1[^>]*>(.+)<\/h1>/);
  return h1?.at(1) || `${format(post.createdAt, "yyyy/MM/dd HH:mm")} の投稿`;
}

export function searchUnusedFiles(
  post: Post & {
    revisions: Revision[];
    files: (FileOnPost & { file: File & { assets: Asset[] } })[];
  }
): (File & { assets: Asset[] })[] {
  const result = post.files
    .map((fp) => fp.file)
    .filter((file) => {
      const bodies = [post.body, ...post.revisions.map((r) => r.body)];

      for (const body of bodies) {
        if (body.indexOf(file.id) !== -1) {
          return false;
        }
      }

      return true;
    });

  return result;
}
