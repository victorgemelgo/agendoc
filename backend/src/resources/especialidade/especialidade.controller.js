const express = require("express");
const router = express.Router();
const especialidadeService = require("./especialidade.service");
const authenticateToken = require("../../middlewares/authMiddle");

router.post("/cadastrar", authenticateToken, async (req, res) => {
  const especialidade = req.body;

  if(req.userProfile !== "admin"){
    return res.status(401).json({ message: "Acesso não autorizado!" });
  }

  const especialidadeCadastrada =
    await especialidadeService.cadastraEspecialidade(especialidade);
  res.status(201).json(especialidadeCadastrada);
});

router.get("/listar", async (req, res) => {
  const especialidade = req.body;
  const especialidadeCadastrada =
    await especialidadeService.buscaEspecialidade(especialidade.nome);
  res.status(201).json(especialidadeCadastrada);
});

router.delete("/deletar/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  const especialidadeCadastrada = await especialidadeService.deletaEspecialidade(id);
  res.status(201).json(especialidadeCadastrada);
});

module.exports = router;
