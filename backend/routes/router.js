const express = require("express");
const routerApp = express.Router();

const appDisciplina = require("../apps/disciplina/controller/ctlDisciplina");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Disciplina
routerApp.get("/getAllDisciplina", appLogin.autenticaJWT, appDisciplina.getAllDisciplina);
routerApp.post("/getDisciplinaByID", appLogin.autenticaJWT, appDisciplina.getDisciplinaByID);
routerApp.post("/insertDisciplina", appLogin.autenticaJWT, appDisciplina.insertDisciplina);
routerApp.post("/updateDisciplina", appLogin.autenticaJWT, appDisciplina.updateDisciplina);
routerApp.post("/deleteDisciplina", appLogin.autenticaJWT, appDisciplina.deleteDisciplina);

// Rota Login
routerApp.post("/login", appLogin.login);
routerApp.post("/logout", appLogin.logout);

module.exports = routerApp;
