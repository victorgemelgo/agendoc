const prisma = require("../../prisma/prismaClient");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//Cadastro de pacientes
async function cadastrarPaciente(paciente) {
  // Verifica se o paciente já existe
  paciente.convenios = JSON.stringify(paciente.convenios);

  const pacienteExistente = await prisma.paciente.findFirst({
    where: {
      OR: [
        { cpf: paciente.cpf },
        { email: paciente.email },
        { celular: paciente.celular },
      ],
    },
  });

  if (pacienteExistente) {
    const mensagem =
      pacienteExistente.email === paciente.email
      ? "Email já cadastrado"
      : pacienteExistente.cpf === paciente.cpf
      ? "CPF já cadastrado"
      : "Celular já cadastrado";
    return { error: mensagem };
  }

  // Criptografa a senha
  const senhaCriptografada = await bcrypt.hash(paciente.password, 10);
  paciente.password = senhaCriptografada;

  // Cadastra o paciente
  const pacienteCadastrado = await prisma.paciente.create({
    data: paciente,
  });
  return {
    msg: "Paciente cadastrado com sucesso!",
    paciente: pacienteCadastrado,
  };
}

// Função para gerar o JWT
function generateToken(paciente) {
  return jwt.sign(
    { id: paciente.id, email: paciente.email, profile: "paciente" },
    process.env.SECRET_KEY,
    {
      expiresIn: "1h",
    }
  );
}

// Função para realizar o login
async function loginPaciente(email, password) {
  // Verifica se o paciente existe
  const paciente = await prisma.paciente.findFirst({
    where: { email },
  });

  if (!paciente) {
    return { error: "Usuário não encontrado" };
  }

  // Verifica se a senha está correta
  const senhaCorreta = await bcrypt.compare(password, paciente.password);
  if (!senhaCorreta) {
    return { error: "Senha incorreta" };
  }

  // Retorna o paciente
  return {
    msg: "Login realizado com sucesso",
    token: generateToken(paciente),
    paciente,
  };
}

//Listar Usuarios
async function listarPaciente(nome) {
  //Verifica se foi buscado algum nome
  if (nome) {
    const paciente = await prisma.paciente.findMany({
      where: {
        nome: {
          contains: nome,
        },
      },
    });
    return paciente;
  }

  const pacientes = await prisma.paciente.findMany();
  return pacientes;
}

//Editar paciente

async function atualizarPaciente(id, paciente) {
  // Verifica se o paciente existe
  const pacienteExistente = await prisma.paciente.findFirst({
    where: {
      id: parseInt(id),
    },
  });

  // retorna erro caso o paciente não exista
  if (!pacienteExistente) {
    return { error: "Paciente não encontrado" };
  }

  //caso atualize a senha será criptografada
  if (paciente.password) {
    const senhaCriptografada = await bcrypt.hash(paciente.password, 10);
    paciente.password = senhaCriptografada;
  }

  // atualiza o paciente
  const atualizaPaciente = await prisma.paciente.update({
    data: paciente,
    where: {
      id: parseInt(id),
    },
  });

  return {
    msg: "Paciente atualizado com sucesso!",
    paciente: atualizaPaciente,
  };
}

module.exports = {
  cadastrarPaciente,
  loginPaciente,
  listarPaciente,
  atualizarPaciente,
};
