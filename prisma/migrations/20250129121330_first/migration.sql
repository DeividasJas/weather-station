-- CreateTable
CREATE TABLE "City" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "latitude" REAL NOT NULL,
    "longitude" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Search" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "timesSearch" DATETIME NOT NULL,
    CONSTRAINT "Search_id_fkey" FOREIGN KEY ("id") REFERENCES "City" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
