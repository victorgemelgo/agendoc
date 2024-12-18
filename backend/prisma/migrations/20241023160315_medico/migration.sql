-- CreateTable
CREATE TABLE "Medico" (
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
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Medico_email_key" ON "Medico"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_cpf_key" ON "Medico"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Medico_crm_key" ON "Medico"("crm");
