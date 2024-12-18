const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

require("dotenv").config();

//USES MIDDLEWARES
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);

//IMPORT @CONTROLLERS
const pacienteRouter = require("./src/resources/paciente/paciente.controller");
const userRouter = require("./src/resources/user/user.controller");
const medicoRouter = require("./src/resources/medico/medico.controller");
const consultaRouter = require("./src/resources/consulta/consulta.controller");
const clinicaRouter = require("./src/resources/clinica/clinica.controller");
const convenioRouter = require("./src/resources/convenio/convenio.controller");
const especialidadeRouter = require("./src/resources/especialidade/especialidade.controller");

//USE @CONTROLLERS
app.use("/paciente", pacienteRouter);
app.use("/user", userRouter);
app.use("/medico", medicoRouter);
app.use("/consulta", consultaRouter);
app.use("/clinica", clinicaRouter);
app.use("/convenio", convenioRouter);
app.use("/especialidade", especialidadeRouter);

app.get("/", (req, res) => {
  const myArr = [{ convenio: "amil" }, { convenio: "bradesco" }];

  res.send(JSON.stringify(myArr));
});

//START SERVER
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
