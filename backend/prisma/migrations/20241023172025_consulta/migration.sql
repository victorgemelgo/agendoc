-- CreateTable
CREATE TABLE "Consulta" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "clinica" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "createdBy" TEXT,
    "updatedBy" TEXT,
    "idPaciente" INTEGER NOT NULL,
    "idMedico" INTEGER NOT NULL,
    CONSTRAINT "Consulta_idPaciente_fkey" FOREIGN KEY ("idPaciente") REFERENCES "Paciente" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Consulta_idMedico_fkey" FOREIGN KEY ("idMedico") REFERENCES "Medico" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
