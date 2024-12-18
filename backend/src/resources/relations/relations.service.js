const prisma = require("../../prisma/prismaClient");

async function cadastraHoraMedico(idMedico, idClinica, dia, hora) {
  const cadastraHorario = await prisma.horariosMedico.create({
    data: {
      medicoId: idMedico,
      clinicaId: idClinica,
      dia: dia,
      horario: hora,
    },
  });

  return {
    msg: "Horário cadastrado com sucesso!",
    cadastraHorario,
  };
}
