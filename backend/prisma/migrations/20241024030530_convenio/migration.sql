-- CreateTable
CREATE TABLE "Convenio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cnpj" TEXT NOT NULL,
    "abrangencia" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Convenio_cnpj_key" ON "Convenio"("cnpj");
