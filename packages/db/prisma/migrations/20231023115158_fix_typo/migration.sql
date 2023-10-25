/*
  Warnings:

  - You are about to drop the `AccesibleUserOnPost` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "AccesibleUserOnPost";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "AccessibleUserOnPost" (
    "postId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("postId", "userId"),
    CONSTRAINT "AccessibleUserOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "AccessibleUserOnPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
