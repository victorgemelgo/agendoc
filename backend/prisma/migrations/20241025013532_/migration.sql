/*
  Warnings:

  - You are about to drop the column `horasAtendimento` on the `Medico` table. All the data in the column will be lost.
  - Added the required column `horarios` to the `Medico` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Medico" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "crm" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "clinicas" TEXT NOT NULL,
    "convenios" TEXT NOT NULL,
    "especialidades" TEXT NOT NULL,
    "horarios" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT
);
INSERT INTO "new_Medico" ("bairro", "celular", "cep", "cidade", "clinicas", "convenios", "cpf", "createdAt", "createdBy", "crm", "email", "endereco", "especialidades", "estado", "id", "nome", "numero", "updatedAt", "updatedBy") SELECT "bairro", "celular", "cep", "cidade", "clinicas", "convenios", "cpf", "createdAt", "createdBy", "crm", "email", "endereco", "especialidades", "estado", "id", "nome", "numero", "updatedAt", "updatedBy" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");
CREATE UNIQUE INDEX "Medico_cpf_key" ON "Medico"("cpf");
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
