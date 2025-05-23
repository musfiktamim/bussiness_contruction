-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Blogs" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" JSONB,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Blogs" ("content", "createdAt", "id", "image", "published", "title", "updatedAt") SELECT "content", "createdAt", "id", "image", "published", "title", "updatedAt" FROM "Blogs";
DROP TABLE "Blogs";
ALTER TABLE "new_Blogs" RENAME TO "Blogs";
CREATE UNIQUE INDEX "Blogs_id_key" ON "Blogs"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
