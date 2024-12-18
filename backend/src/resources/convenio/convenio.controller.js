const express = require("express");
const router = express.Router();
const convenioService = require("./convenio.service");
const authenticateToken = require("../../middlewares/authMiddle");

//CREATE
router.post("/cadastrar", authenticateToken, async (req, res) => {
  const convenio = req.body;

  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const convenioCadastrado = await convenioService.criaConvenio(convenio);
  if (convenioCadastrado.error) {
    return res.status(400).json({ error: convenioCadastrado.error });
  }
  res.status(201).json(convenioCadastrado);
});

//READ
router.get("/listar", authenticateToken, async (req, res) => {
  convenios = req.body;
  const convenio = await convenioService.listarConvenios(
    convenios.nome,
    convenios.cnpj,
    convenios.abrangencia,
    convenios.status
  );
  res.status(200).json(convenio);
});

//UPDATE
router.patch("/atualizar/:id", authenticateToken, async (req, res) => {
  const convenio = req.body;
  const id = req.params.id;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const convenioAtualizado = await convenioService.atualizaConvenio(
    id,
    convenio
  );
  if (convenioAtualizado.error) {
    return res.status(400).json({ error: convenioAtualizado.error });
  }
  res.status(200).json(convenioAtualizado);
});

//DELETE
router.delete("/deletar/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  const convenioDeletado = await convenioService.deletaConvenio(id);
  if (convenioDeletado.error) {
    return res.status(400).json({ error: convenioDeletado.error });
  }
  res.status(200).json(convenioDeletado);
});

module.exports = router;
