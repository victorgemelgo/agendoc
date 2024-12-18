const express = require("express");
const router = express.Router();
const clinicaService = require("./clinica.service");
const authenticateToken = require("../../middlewares/authMiddle");

//CREATE
router.post("/cadastrar", authenticateToken, async (req, res) => {
  const clinica = req.body;

  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const clinicaCadastrada = await clinicaService.criaClinica(clinica);
  if (clinicaCadastrada.error) {
    return res.status(400).json({ error: clinicaCadastrada.error });
  }
  res.status(201).json(clinicaCadastrada);
});

//READ
router.get("/listar", authenticateToken, async (req, res) => {
  const clinica = req.body;

  const clinicas = await clinicaService.listarClinicas(
    clinica.nome,
    clinica.cnpj,
    clinica.cidade,
    clinica.estado
  );
  res.status(200).json(clinicas);
});

//UPDATE
router.patch("/atualizar/:id", authenticateToken, async (req, res) => {
  const clinica = req.body;
  const id = req.params.id;

  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const clinicaAtualizada = await clinicaService.atualizarClinica(id, clinica);
  if (clinicaAtualizada.error) {
    return res.status(400).json({ error: clinicaAtualizada.error });
  }
  res.status(200).json(clinicaAtualizada);
});

//DELETE

router.delete("/deletar/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  const clinicaDeletada = await clinicaService.deletarClinica(id);
  if (clinicaDeletada.error) {
    return res.status(400).json({ error: clinicaDeletada.error });
  }
  res.status(200).json(clinicaDeletada);
});

module.exports = router;
