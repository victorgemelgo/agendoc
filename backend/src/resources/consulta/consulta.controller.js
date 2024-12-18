const express = require("express");
const router = express.Router();
const consultaService = require("./consulta.service");
const authenticateToken = require("../../middlewares/authMiddle");

//=====================CRUD=================//

//CREATE
// O metodo abaixo agenda uma consulta
router.post("/agendar", authenticateToken, async (req, res) => {
  const consulta = req.body;
  const consultaCriada = await consultaService.criaConsulta(consulta);
  res.send(consultaCriada);
});

//READ

// O metodo abaixo lista as consultas do medico
router.get("/listar", authenticateToken, async (req, res) => {
  const requi = req.body;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  const consulta = await consultaService.listaConsultas(
    requi.idPaciente,
    requi.idMedico
  );
  res.send(consulta);
});

// O metodo abaixo lista as consultas do paciente
router.get("/listarMinhasConsultas", authenticateToken, async (req, res) => {
  const paciente = req.body;

  if (req.userId != paciente.id || req.userProfile !== "paciente") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const consulta = await consultaService.listaMinhaConsulta(paciente.id);
  res.send(consulta);
});

//UPDATE

router.patch("/atualizar/:id", authenticateToken, async (req, res) => {
  const consulta = req.body;
  const id = req.params.id;

  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }

  const consultaAtualizada = await consultaService.atualizaConsulta(
    id,
    consulta
  );
  res.send(consultaAtualizada);
});

//DELETE
router.delete("/deletar/:id", authenticateToken, async (req, res) => {
  const id = req.params.id;
  if (req.userProfile !== "admin") {
    return res.status(403).json({ error: "Acesso não autorizado" });
  }
  const consultaDeletada = await consultaService.deletaConsulta(id);
  res.send(consultaDeletada);
});

module.exports = router;
