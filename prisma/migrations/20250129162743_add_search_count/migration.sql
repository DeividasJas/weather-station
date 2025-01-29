/*
  Warnings:

  - You are about to drop the `Search` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Search";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL,
    "searchCount" INTEGER NOT NULL DEFAULT 0
);
INSERT INTO "new_City" ("country", "id", "latitude", "longitude", "name") SELECT "country", "id", "latitude", "longitude", "name" FROM "City";
DROP TABLE "City";
ALTER TABLE "new_City" RENAME TO "City";
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
