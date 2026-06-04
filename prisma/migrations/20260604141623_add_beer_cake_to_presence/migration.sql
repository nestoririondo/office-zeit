-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Presence" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "person" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "withDog" BOOLEAN NOT NULL DEFAULT false,
    "late" BOOLEAN NOT NULL DEFAULT false,
    "withBeer" BOOLEAN NOT NULL DEFAULT false,
    "withCake" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Presence" ("createdAt", "date", "id", "late", "person", "withDog") SELECT "createdAt", "date", "id", "late", "person", "withDog" FROM "Presence";
DROP TABLE "Presence";
ALTER TABLE "new_Presence" RENAME TO "Presence";
CREATE UNIQUE INDEX "Presence_person_date_key" ON "Presence"("person", "date");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
