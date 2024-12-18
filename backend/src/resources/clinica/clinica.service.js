const { parse } = require("dotenv");
const prisma = require("../../prisma/prismaClient");

async function criaClinica(clinica) {
  const clinicaExistente = await prisma.clinica.findUnique({
    where: {
      cnpj: clinica.cnpj,
    },
  });

  if (clinicaExistente) {
    const mensagem = "Clinica já cadastrada";
    return { error: mensagem };
  }

  const clinicaCadastrada = await prisma.clinica.create({
    data: clinica,
  });

  return {
    msg: "Clinica cadastrada com sucesso!",
    clinica: clinicaCadastrada,
  };
}

async function listarClinicas(nome, cnpj, cidade, estado) {
  const clinica = await prisma.clinica.findMany({
    where: {
      nome: { contains: nome ? nome : undefined },
      cnpj: { contains: cnpj ? cnpj : undefined },
      cidade: { contains: cidade ? cidade : undefined },
      estado: { contains: estado ? estado : undefined },
    },
  });
  return clinica;
}

async function atualizarClinica(id, clinica) {
  const clinicaExistente = await prisma.clinica.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!clinicaExistente) {
    const mensagem = "Clinica não encontrada";
    return { error: mensagem };
  }

  const clinicaAtualizada = await prisma.clinica.update({
    where: {
      id: parseInt(id),
    },
    data: clinica,
  });
  return {
    msg: "Clinica atualizada com sucesso!",
    clinica: clinicaAtualizada,
  };
}

//DELETE
async function deletarClinica(id) {
  const clinicaExistente = await prisma.clinica.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if(!clinicaExistente) {
    const mensagem = "Clinica não encontrada";
    return { error: mensagem };
  }

  await prisma.clinica.delete({
    where: {
      id: parseInt(id),
    },
  });

  return {
    msg: "Clinica deletada com sucesso!",
  };
}

module.exports = {
  criaClinica,
  listarClinicas,
  atualizarClinica,
  deletarClinica,
};
