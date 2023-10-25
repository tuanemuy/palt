/*
  Warnings:

  - You are about to drop the column `level` on the `TagOnPost` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_AccessibleUserOnPost" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'read',

    PRIMARY KEY ("postId", "userId"),
    CONSTRAINT "AccessibleUserOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AccessibleUserOnPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_AccessibleUserOnPost" ("postId", "userId") SELECT "postId", "userId" FROM "AccessibleUserOnPost";
DROP TABLE "AccessibleUserOnPost";
ALTER TABLE "new_AccessibleUserOnPost" RENAME TO "AccessibleUserOnPost";
CREATE TABLE "new_TagOnPost" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,

    PRIMARY KEY ("postId", "tagId"),
    CONSTRAINT "TagOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagOnPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TagOnPost" ("postId", "tagId") SELECT "postId", "tagId" FROM "TagOnPost";
DROP TABLE "TagOnPost";
ALTER TABLE "new_TagOnPost" RENAME TO "TagOnPost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
