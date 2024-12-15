var express = require('express');
var router = express.Router();
var cursoApp = require("../apps/curso/controller/ctlCurso"); // Alterando para o controlador de Curso

// Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    

    if (!isLogged) {      
        res.redirect("/Login");
    }
    next();
}; 

router.get('/manutCurso', authenticationMiddleware, cursoApp.manutCurso);  // Alterando para manutCurso
router.get('/insertCurso', authenticationMiddleware, cursoApp.insertCurso);  // Alterando para insertCurso
router.get('/viewCurso/:id', authenticationMiddleware, cursoApp.viewCurso);  // Alterando para viewCurso
router.get('/updateCurso/:id', authenticationMiddleware, cursoApp.updateCurso);  // Alterando para updateCurso

router.post('/insertCurso', authenticationMiddleware, cursoApp.insertCurso);  // Alterando para insertCurso
router.post('/updateCurso', authenticationMiddleware, cursoApp.updateCurso);  // Alterando para updateCurso
router.post('/deleteCurso', authenticationMiddleware, cursoApp.deleteCurso);  // Alterando para deleteCurso

module.exports = router;
