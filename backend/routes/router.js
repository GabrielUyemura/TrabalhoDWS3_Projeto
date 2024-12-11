const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
const appCurso = require("../apps/curso/controller/ctlCurso");
const appDisciplina = require("../apps/disciplina/controller/ctlDisciplina");
const appMatricula = require("../apps/matricula/controller/ctlMatricula");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Curso
routerApp.get("/getAllCurso", appLogin.autenticaJWT, appCurso.getAllCurso);
routerApp.post("/getCursoByID", appLogin.autenticaJWT, appCurso.getCursoByID);
routerApp.post("/insertCurso", appLogin.autenticaJWT, appCurso.insertCurso);
routerApp.post("/updateCurso", appLogin.autenticaJWT, appCurso.updateCurso);
routerApp.post("/deleteCurso", appLogin.autenticaJWT, appCurso.deleteCurso);

//Rotas de Disciplina
routerApp.get("/getAllDisciplina", appLogin.autenticaJWT, appDisciplina.getAllDisciplina);
routerApp.post("/getDisciplinaByID", appLogin.autenticaJWT, appDisciplina.getDisciplinaByID);
routerApp.post("/insertDisciplina", appLogin.autenticaJWT, appDisciplina.insertDisciplina);
routerApp.post("/updateDisciplina", appLogin.autenticaJWT, appDisciplina.updateDisciplina);
routerApp.post("/deleteDisciplina", appLogin.autenticaJWT, appDisciplina.deleteDisciplina);

//Rotas de Matricula
routerApp.get("/getAllMatricula", appLogin.autenticaJWT, appMatricula.getAllMatricula);
routerApp.post("/getMatriculaByID", appLogin.autenticaJWT, appMatricula.getMatriculaByID);
routerApp.post("/insertMatricula", appLogin.autenticaJWT, appMatricula.insertMatricula);
routerApp.post("/updateMatricula", appLogin.autenticaJWT, appMatricula.updateMatricula);
routerApp.post("/deleteMatricula", appLogin.autenticaJWT, appMatricula.deleteMatricula);

// Rota Login
routerApp.post("/login", appLogin.login);
routerApp.post("/logout", appLogin.logout);

module.exports = routerApp;
