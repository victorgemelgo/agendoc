const prisma = require("../../prisma/prismaClient");

async function cadastraEspecialidade(especialidade) {
  const especialidadeCadastrada = await prisma.especialidades.create({
    data: {
      nome: especialidade.nome,
    },
  });
  return {
    msg: "Especialidade cadastrada com sucesso!",
    especialidadeCadastrada,
  };
}

async function buscaEspecialidade(nome) {
  if (!nome) {
    const especialidadeCadastrada = await prisma.especialidades.findMany();
    return especialidadeCadastrada;
  }

  const especialidadeCadastrada = await prisma.especialidades.findFirst({
    where: {
      nome: {
        contains: nome,
      },
    },
  });
  return especialidadeCadastrada;
}

async function deletaEspecialidade(id) {
  const especialidadeCadastrada = await prisma.especialidades.delete({
    where: {
      id: parseInt(id),
    },
  });

  return {
    msg: "Especialidade deletada com sucesso!",
    especialidadeCadastrada,
  };
}

module.exports = {
  cadastraEspecialidade,
  buscaEspecialidade,
  deletaEspecialidade
};
