const prisma = require("../../prisma/prismaClient");

//==============<CRUD>============= //
//CREATE

async function cadastrarMedico(medico) {

  medico.clinicas = JSON.stringify(medico.clinicas);
  medico.convenios = JSON.stringify(medico.convenios);
  medico.especialidades = JSON.stringify(medico.especialidades);
  medico.horarios = JSON.stringify(medico.horarios);

  const medicoExistente = await prisma.medico.findFirst({
    where: {
      OR: [
        {
          cpf: medico.cpf,
        },
        {
          crm: medico.crm,
        },
        {
          email: medico.email,
        },
      ],
    },
  });

  if (medicoExistente) {
    const mensagem = "Médico já cadastrado";
    return { error: mensagem };
  }

  const medicoCadastrado = await prisma.medico.create({
    data: medico,
  });

  return {
    msg: "Médico cadastrado com sucesso!",
    medico: medicoCadastrado,
  };
}

//READ
async function listarMedicos(nome) {
  try {
    const medicos = await prisma.medico.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
    });
    return medicos;
  } catch (error) {
    console.error("Erro ao listar médicos:", error);
    return { error: "Erro ao listar médicos" };
  }
}

//UPDATE
async function atualizarMedico(id, medico) {
  const medicoExistente = await prisma.medico.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  if (!medicoExistente) {
    return { error: "Médico não encontrado" };
  }

  const medicoAtualizado = await prisma.medico.update({
    data: medico,
    where: {
      id: parseInt(id),
    },
  });

  return {
    msg: "Médico atualizado com sucesso!",
    medico: medicoAtualizado,
  };
}

//DELETE
async function deletarMedico(id) {
  const medicoExistente = await prisma.medico.findFirst({
    where: {
      id: parseInt(id),
    },
  });
  if (!medicoExistente) {
    return { error: "Médico não encontrado" };
  }

  const medicoDeletado = await prisma.medico.delete({
    where: {
      id: parseInt(id),
    },
  });
  return {
    msg: "Médico deletado com sucesso!",
    medico: medicoDeletado,
  };
}

module.exports = {
  cadastrarMedico,
  listarMedicos,
  atualizarMedico,
  deletarMedico,
};
