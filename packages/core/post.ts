import { User, Post, Tag, TagOnPost, AccessibleUserOnPost } from "db";

export type { Post, Tag, AccessibleUserOnPost, FileOnPost } from "db";

export type FullPost = Post & {
  user: User;
  tags: (TagOnPost & {
    tag: Tag;
  })[];
  accessibleUsers: (AccessibleUserOnPost & {
    user: User;
  })[];
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
