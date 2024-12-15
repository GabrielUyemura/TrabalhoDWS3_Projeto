var express = require('express');
var router = express.Router();
var matriculaApp = require("../apps/matricula/controller/ctlMatricula"); // Alterando para o controlador de Matricula

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;

    if (!isLogged) {
        res.redirect("/Login");
    }
    next();
};

router.get('/manutMatricula', authenticationMiddleware, matriculaApp.manutMatricula);  // Alterando para manutMatricula
router.get('/insertMatricula', authenticationMiddleware, matriculaApp.insertMatricula);  // Alterando para insertMatricula
router.get('/viewMatricula/:id', authenticationMiddleware, matriculaApp.viewMatricula);  // Alterando para viewMatricula
router.get('/updateMatricula/:id', authenticationMiddleware, matriculaApp.updateMatricula);  // Alterando para updateMatricula

router.post('/insertMatricula', authenticationMiddleware, matriculaApp.insertMatricula);  // Alterando para insertMatricula
router.post('/updateMatricula', authenticationMiddleware, matriculaApp.updateMatricula);  // Alterando para updateMatricula
router.post('/deleteMatricula', authenticationMiddleware, matriculaApp.deleteMatricula);  // Alterando para deleteMatricula

module.exports = router;