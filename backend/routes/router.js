const express = require("express");
const routerApp = express.Router();

const appTitulo = require("../apps/titulo/controller/ctlTitulo");
const appLogin = require("../apps/login/controller/ctlLogin");

// middleware that is specific to this router
routerApp.use((req, res, next) => {
  next();
});

routerApp.get("/", (req, res) => {
  res.send("Olá mundo!");
});

//Rotas de Titulo
routerApp.get("/getAllTitulo", appLogin.autenticaJWT, appTitulo.getAllTitulo);
routerApp.post("/getTituloByID", appLogin.autenticaJWT, appTitulo.getTituloByID);
routerApp.post("/insertTitulo", appLogin.autenticaJWT, appTitulo.insertTitulo);
routerApp.post("/updateTitulo", appLogin.autenticaJWT, appTitulo.updateTitulo);
routerApp.post("/deleteTitulo", appLogin.autenticaJWT, appTitulo.deleteTitulo);

// Rota Login
routerApp.post("/login", appLogin.login);
routerApp.post("/logout", appLogin.logout);

module.exports = routerApp;
