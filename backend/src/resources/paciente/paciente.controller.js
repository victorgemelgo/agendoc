const express = require("express");
const router = express.Router();
const pacienteService = require("./paciente.service");
const authenticateToken = require("../../middlewares/authMiddle");

// =============<AUTHENTICATION>============= //

router.post("/cadastrar", async (req, res) => {
  const paciente = req.body;

  const pacienteCadastrado = await pacienteService.cadastrarPaciente(paciente);

  if (pacienteCadastrado.error) {
    return res.status(400).json({ error: pacienteCadastrado.error });
  }
  res.status(201).json(pacienteCadastrado);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const paciente = await pacienteService.loginPaciente(email, password);
  if (paciente.error) {
    return res.status(400).json({ error: paciente.error });
  }
  res.status(200).json(paciente);
});

// =============</ AUTHENTICATION>============= //
// =============<CRUD>============= //

//READ
router.get("/listar", authenticateToken, async (req, res) => {
  const paciente = req.body;
  const pacientes = await pacienteService.listarPaciente(paciente.nome);
  res.status(200).json(pacientes);
});

//UPDATE
router.patch("/atualizar/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const paciente = req.body;

  if (parseInt(id) !== req.userId && req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const pacienteAtualizado = await pacienteService.atualizarPaciente(
    id,
    paciente
  );
  if (pacienteAtualizado.error) {
    return res.status(400).json({ error: pacienteAtualizado.error });
  }
  res.status(200).json(pacienteAtualizado);
});

module.exports = router;
