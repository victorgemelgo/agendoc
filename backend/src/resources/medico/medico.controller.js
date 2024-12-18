const express = require("express");
const router = express.Router();
const medicoService = require("./medico.service");
const authenticateToken = require("../../middlewares/authMiddle");

//==============<CRUD>============= //

//CREATE
router.post("/cadastrar", authenticateToken, async (req, res) => {
  const medico = req.body;
  const medicoCadastrado = await medicoService.cadastrarMedico(medico);
  if (medicoCadastrado.error) {
    return res.status(400).json({ error: medicoCadastrado.error });
  }
  res.status(201).json(medicoCadastrado);
});

//READ
router.get("/listar", authenticateToken, async (req, res) => {
  const medico = req.body;
  const medicos = await medicoService.listarMedicos(medico.nome);
  res.status(200).json(medicos);
});

//UPDATE
router.patch("/atualizar/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const medico = req.body;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  const medicoAtualizado = await medicoService.atualizarMedico(id, medico);
  if (medicoAtualizado.error) {
    return res.status(400).json({ error: medicoAtualizado.error });
  }
  res.status(200).json(medicoAtualizado);
});

//DELETE
router.delete("/deletar/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  const medicoDeletado = await medicoService.deletarMedico(id);
  if (medicoDeletado.error) {
    return res.status(400).json({ error: medicoDeletado.error });
  }
  res.status(200).json(medicoDeletado);
});

module.exports = router;
