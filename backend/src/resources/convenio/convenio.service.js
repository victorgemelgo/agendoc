const prisma = require("../../prisma/prismaClient");

//CREATE
async function criaConvenio(convenio) {
  const convenioExistente = await prisma.convenio.findUnique({
    where: {
      cnpj: convenio.cnpj,
    },
  });

  if (convenioExistente) {
    const mensagem = "Convenio já cadastrado";
    return { error: mensagem };
  }

  const convenioCadastrado = await prisma.convenio.create({
    data: convenio,
  });

  return {
    msg: "Convenio cadastrado com sucesso!",
    convenio: convenioCadastrado,
  };
}

//READ
async function listarConvenios(nome, cnpj, abrangencia, status) {
  const convenio = await prisma.convenio.findMany({
    where: {
      nome: { contains: nome ? nome : undefined },
      cnpj: { contains: cnpj ? cnpj : undefined },
      abrangencia: { contains: abrangencia ? abrangencia : undefined },
      status: { contains: status ? status : undefined },
    },
  });

  return convenio;
}

//UPDATE
async function atualizaConvenio(id, convenio) {
  const convenioExistente = await prisma.convenio.findUnique({
    where: {
      id: parseInt(id),
    },
  });

  if (!convenioExistente) {
    const mensagem = "Convenio não encontrado";
    return { error: mensagem };
  }

  const convenioAtualizado = await prisma.convenio.update({
    where: {
      id: parseInt(id),
    },
    data: convenio,
  });
  return {
    msg: "Convenio atualizado com sucesso!",
    convenio: convenioAtualizado,
  };
}

//DELETE
async function deletaConvenio(id) {
  const convenioExistente = await prisma.convenio.findUnique({
    where: {
      id: parseInt(id),
    },
  });
  if (!convenioExistente) {
    const mensagem = "Convenio não encontrado";
    return { error: mensagem };
  }

  await prisma.convenio.delete({
    where: {
      id: parseInt(id),
    },
  });
  return {
    msg: "Convenio deletado com sucesso!",
    convenio: convenioExistente,
  };
}

module.exports = {
  criaConvenio,
  listarConvenios,
  atualizaConvenio,
  deletaConvenio
};
