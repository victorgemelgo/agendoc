const prisma = require("../../prisma/prismaClient");

//CREATE
async function criaConsulta(consulta) {
  const consultas = await prisma.consulta.create({
    data: consulta,
  });

  return {
    msg: "Consulta agendada com sucesso!",
    consulta: consultas,
  };
}

// READS

async function listaConsultas(idPaciente, idMedico) {
  const consulta = await prisma.consulta.findMany({
    where: {
      idPaciente: parseInt(idPaciente) ? parseInt(idPaciente) : undefined,
      idMedico: parseInt(idMedico) ? parseInt(idMedico) : undefined,
    },
    include: {
      paciente: true,
      medico: true,
    },
  });

  return consulta;
}

async function listaMinhaConsulta(id) {
  const consulta = await prisma.consulta.findMany({
    where: {
      idPaciente: parseInt(id),
    },
    include: {
      paciente: true,
      medico: true,
    },
  });

  return consulta;
}

//UPDATE
async function atualizaConsulta(id, consulta) {
  const consultaAtualizada = await prisma.consulta.update({
    where: {
      id: parseInt(id),
    },
    data: consulta,
  });

  return {
    msg: "Consulta atualizada com sucesso!",
    consulta: consultaAtualizada,
  };
}

//DELETE
async function deletaConsulta(id) {
  const consultaDeletada = await prisma.consulta.delete({
    where: {
      id: parseInt(id),
    },
  });

  return {
    msg: "Consulta deletada com sucesso!",
    consulta: consultaDeletada,
  };
}

module.exports = {
  listaMinhaConsulta,
  listaConsultas,
  criaConsulta,
  atualizaConsulta,
  deletaConsulta,
};
