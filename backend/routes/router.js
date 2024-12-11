const express = require("express");
const routerApp = express.Router();

const appLogin = require("../apps/login/controller/ctlLogin");
// const appCurso = require("../apps/curso/controller/ctlCurso");
// const appAluno = require("../apps/aluno/controller/ctlAluno");
const appDisciplina = require("../apps/disciplina/controller/ctlDisciplina");
const appMatricula = require("../apps/matricula/controller/ctlMatricula");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

// //Rotas de Aluno
// routerApp.get("/getAllAluno", appLogin.autenticaJWT, appAluno.getAllAluno);
// routerApp.post("/getAlunoByID", appLogin.autenticaJWT, appAluno.getAlunoByID);
// routerApp.post("/insertAluno", appLogin.autenticaJWT, appAluno.insertAluno);
// routerApp.put("/updateAluno", appLogin.autenticaJWT, appAluno.updateAluno);
// routerApp.delete("/deleteAluno", appLogin.autenticaJWT, appAluno.deleteAluno);

// //Rotas de Curso
// routerApp.get("/getAllCurso", appLogin.autenticaJWT, appCurso.getAllCurso);
// routerApp.post("/getCursoByID", appLogin.autenticaJWT, appCurso.getCursoByID);
// routerApp.post("/insertCurso", appLogin.autenticaJWT, appCurso.insertCurso);
// routerApp.put("/updateCurso", appLogin.autenticaJWT, appCurso.updateCurso);
// routerApp.delete("/deleteCurso", appLogin.autenticaJWT, appCurso.deleteCurso);

//Rotas de Disciplina
routerApp.get("/getAllDisciplina", appLogin.autenticaJWT, appDisciplina.getAllDisciplina);
routerApp.post("/getDisciplinaByID", appLogin.autenticaJWT, appDisciplina.getDisciplinaByID);
routerApp.post("/insertDisciplina", appLogin.autenticaJWT, appDisciplina.insertDisciplina);
routerApp.put("/updateDisciplina", appLogin.autenticaJWT, appDisciplina.updateDisciplina);
routerApp.delete("/deleteDisciplina", appLogin.autenticaJWT, appDisciplina.deleteDisciplina);

//Rotas de Matricula
routerApp.get("/getAllMatricula", appLogin.autenticaJWT, appMatricula.getAllMatricula);
routerApp.post("/getMatriculaByID", appLogin.autenticaJWT, appMatricula.getMatriculaByID);
routerApp.post("/insertMatricula", appLogin.autenticaJWT, appMatricula.insertMatricula);
routerApp.put("/updateMatricula", appLogin.autenticaJWT, appMatricula.updateMatricula);
routerApp.delete("/deleteMatricula", appLogin.autenticaJWT, appMatricula.deleteMatricula);

// Rota Login
routerApp.post("/login", appLogin.login);
routerApp.post("/logout", appLogin.logout);

module.exports = routerApp;
