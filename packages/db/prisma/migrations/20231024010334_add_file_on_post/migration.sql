-- CreateTable
CREATE TABLE "FileOnPost" (
    "postId" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,

    PRIMARY KEY ("postId", "fileId"),
    CONSTRAINT "FileOnPost_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "FileOnPost_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "File" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
