-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_FileOnPost" (
    "postId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    PRIMARY KEY ("postId", "fileId"),
    CONSTRAINT "FileOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FileOnPost_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_FileOnPost" ("fileId", "postId") SELECT "fileId", "postId" FROM "FileOnPost";
DROP TABLE "FileOnPost";
ALTER TABLE "new_FileOnPost" RENAME TO "FileOnPost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
