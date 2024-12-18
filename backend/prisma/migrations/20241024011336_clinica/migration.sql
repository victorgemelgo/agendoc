/*
  Warnings:

  - You are about to drop the column `clinica` on the `Consulta` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "Clinica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Consulta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "idPaciente" INTEGER NOT NULL,
    "idMedico" INTEGER NOT NULL,
    "idClinica" INTEGER,
    CONSTRAINT "Consulta_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_idClinica_fkey" FOREIGN KEY ("idClinica") REFERENCES "Clinica" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Consulta" ("createdAt", "createdBy", "data", "id", "idMedico", "idPaciente", "status", "tipo", "updatedAt", "updatedBy") SELECT "createdAt", "createdBy", "data", "id", "idMedico", "idPaciente", "status", "tipo", "updatedAt", "updatedBy" FROM "Consulta";
DROP TABLE "Consulta";
ALTER TABLE "new_Consulta" RENAME TO "Consulta";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Clinica_cnpj_key" ON "Clinica"("cnpj");
