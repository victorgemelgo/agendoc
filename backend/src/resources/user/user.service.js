const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Cadastro de Usuarios
async function cadastrarUser(user) {
  // Verifica se o user já existe
  const userExistente = await prisma.user.findFirst({
    where: {
      email: user.email,
    },
  });

  if (userExistente) {
    const mensagem = "Email já cadastrado";
    return { error: mensagem };
  }

  // Criptografa a senha
  const senhaCriptografada = await bcrypt.hash(user.password, 10);
  user.password = senhaCriptografada;

  // Cadastra o user
  const userCadastrado = await prisma.user.create({
    data: user,
  });
  return {
    msg: "Usuário cadastrado com sucesso!",
    user: userCadastrado,
  };
}

// Função para gerar o JWT
function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, profile: "admin" },
    process.env.SECRET_KEY,
    {
      expiresIn: "30d",
    }
  );
}

// Função para realizar o login
async function loginUser(email, password) {
  // Verifica se o paciente existe
  const user = await prisma.user.findFirst({
    where: { email },
  });

  if (!user) {
    return { error: "Usuário não encontrado" };
  }

  // Verifica se a senha está correta
  const senhaCorreta = await bcrypt.compare(password, user.password);
  if (!senhaCorreta) {
    return { error: "Senha incorreta" };
  }

  // Retorna o paciente
  return {
    msg: "Login realizado com sucesso",
    token: generateToken(user),
    user,
  };
}

//Listar Usuarios
async function listarUsers(nome) {
  //Verifica se foi buscado algum nome
  if (nome) {
    const user = await prisma.user.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
    });
    return user;
  }

  const users = await prisma.user.findMany();
  return users;
}

//Editar Usuario

async function atualizarUser(id, user) {
  // Verifica se o usuario existe
  const userExistente = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  // retorna erro caso o usuario não exista
  if (!userExistente) {
    return { error: "Usuário não encontrado" };
  }

  //caso atualize a senha será criptografada
  if (user.password) {
    const senhaCriptografada = await bcrypt.hash(user.password, 10);
    user.password = senhaCriptografada;
  }

  // atualiza o paciente
  const atualizaUser = await prisma.user.update({
    data: user,
    where: {
      id: parseInt(id),
    },
  });

  return {
    msg: "Usuário atualizado com sucesso!",
    paciente: atualizaUser,
  };
}

async function deletarUser(id) {
  // Verifica se o usuario existe
  const userExistente = await prisma.user.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  // retorna erro caso o usuario não exista
  if (!userExistente) {
    return { error: "Usuário não encontrado" };
  }

  // deleta o usuario
  const deletarUser = await prisma.user.delete({
    where: {
      id: parseInt(id),
    },
  });

  return {
    msg: "Usuário deletado com sucesso!",
    user: deletarUser,
  };
}

module.exports = {
  cadastrarUser,
  loginUser,
  listarUsers,
  atualizarUser,
  deletarUser,
};
