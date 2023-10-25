-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_TagOnPost" (
    "postId" TEXT NOT NULL,
    "tagId" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'read',

    PRIMARY KEY ("postId", "tagId"),
    CONSTRAINT "TagOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TagOnPost_tagId_fkey" FOREIGN KEY ("tagId") REFERENCES "Tag" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_TagOnPost" ("postId", "tagId") SELECT "postId", "tagId" FROM "TagOnPost";
DROP TABLE "TagOnPost";
ALTER TABLE "new_TagOnPost" RENAME TO "TagOnPost";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
