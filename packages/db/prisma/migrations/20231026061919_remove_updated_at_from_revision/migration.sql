/*
  Warnings:

  - You are about to drop the column `updatedAt` on the `Revision` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Revision" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "postId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Revision_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Revision" ("body", "createdAt", "id", "postId") SELECT "body", "createdAt", "id", "postId" FROM "Revision";
DROP TABLE "Revision";
ALTER TABLE "new_Revision" RENAME TO "Revision";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
