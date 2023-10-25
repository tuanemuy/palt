/*
  Warnings:

  - Added the required column `mimeType` to the `Asset` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Asset" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "fileId" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "mimeType" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    CONSTRAINT "Asset_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Asset" ("fileId", "id", "key", "label", "url") SELECT "fileId", "id", "key", "label", "url" FROM "Asset";
DROP TABLE "Asset";
ALTER TABLE "new_Asset" RENAME TO "Asset";
CREATE UNIQUE INDEX "Asset_key_key" ON "Asset"("key");
CREATE UNIQUE INDEX "Asset_fileId_label_key" ON "Asset"("fileId", "label");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
