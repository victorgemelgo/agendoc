const express = require("express");
const router = express.Router();
const userService = require("./user.service");
const authenticateToken = require("../../middlewares/authMiddle");

// =============<AUTHENTICATION>============= //

router.post("/cadastrar", async (req, res) => {
  const user = req.body;
  const userCadastrado = await userService.cadastrarUser(user);
  if (userCadastrado.error) {
    return res.status(400).json({ error: userCadastrado.error });
  }
  res.status(201).json(userCadastrado);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.loginUser(email, password);
  if (user.error) {
    return res.status(400).json({ error: user.error });
  }
  res.status(200).json(user);
});

// =============</ AUTHENTICATION>============= //
// =============<CRUD>============= //

//READ
router.get("/listar", authenticateToken, async (req, res) => {
  const user = req.body;
  const users = await userService.listarUsers(user.nome);
  res.status(200).json(users);
});

//UPDATE
router.patch("/atualizar/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  const user = req.body;

  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const userAtualizado = await userService.atualizarUser(id, user);
  if (userAtualizado.error) {
    return res.status(400).json({ error: userAtualizado.error });
  }
  res.status(200).json(userAtualizado);
});

//DELETE
router.delete("/deletar/:id", authenticateToken, async (req, res) => {
  const { id } = req.params;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  const userDeletado = await userService.deletarUser(id);
  if (userDeletado.error) {
    return res.status(400).json({ error: userDeletado.error });
  }
  res.status(200).json(userDeletado);
});

module.exports = router;
