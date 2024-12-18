/*
  Warnings:

  - You are about to drop the column `convenio` on the `Paciente` table. All the data in the column will be lost.
  - Added the required column `clinicas` to the `Medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `convenios` to the `Medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `especialidades` to the `Medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horasAtendimento` to the `Medico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `convenios` to the `Paciente` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Especialidades" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL
);

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
    "horasAtendimento" TEXT NOT NULL,
    "convenios" TEXT NOT NULL,
    "especialidades" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT
);
INSERT INTO "new_Medico" ("bairro", "celular", "cep", "cidade", "cpf", "createdAt", "createdBy", "crm", "email", "endereco", "estado", "id", "nome", "numero", "updatedAt", "updatedBy") SELECT "bairro", "celular", "cep", "cidade", "cpf", "createdAt", "createdBy", "crm", "email", "endereco", "estado", "id", "nome", "numero", "updatedAt", "updatedBy" FROM "Medico";
DROP TABLE "Medico";
ALTER TABLE "new_Medico" RENAME TO "Medico";
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");
CREATE UNIQUE INDEX "Medico_cpf_key" ON "Medico"("cpf");
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");
CREATE TABLE "new_Paciente" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "nascimento" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hasConvenio" BOOLEAN NOT NULL,
    "convenios" TEXT NOT NULL,
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
INSERT INTO "new_Paciente" ("bairro", "celular", "cep", "cidade", "cpf", "createdAt", "createdBy", "email", "endereco", "estado", "hasConvenio", "id", "nascimento", "nome", "numero", "password", "sexo", "updatedAt", "updatedBy") SELECT "bairro", "celular", "cep", "cidade", "cpf", "createdAt", "createdBy", "email", "endereco", "estado", "hasConvenio", "id", "nascimento", "nome", "numero", "password", "sexo", "updatedAt", "updatedBy" FROM "Paciente";
DROP TABLE "Paciente";
ALTER TABLE "new_Paciente" RENAME TO "Paciente";
CREATE UNIQUE INDEX "Paciente_email_key" ON "Paciente"("email");
CREATE UNIQUE INDEX "Paciente_cpf_key" ON "Paciente"("cpf");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
