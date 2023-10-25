import { User, Profile, File, Asset } from "db";

export type { User, Profile } from "db";

export type FullUser = User & {
  profile:
    | (Profile & { thumbnail: (File & { assets: Asset[] }) | null })
    | null;
};

export const OrderBy = {
  CREATED: "createdAt",
  UPDATED: "updatedAt",
} as const;
export type OrderBy = (typeof OrderBy)[keyof typeof OrderBy];

export function orderByToString(orderBy: OrderBy) {
  switch (orderBy) {
    case OrderBy.CREATED:
      return "作成日時";
    case OrderBy.UPDATED:
      return "更新日時";
    default:
      return "不明";
  }
}

export function stringToOrderBy(str: string) {
  switch (str) {
    case "createdAt":
      return OrderBy.CREATED;
    case "updatedAt":
      return OrderBy.UPDATED;
    default:
      return OrderBy.CREATED;
  }
}
