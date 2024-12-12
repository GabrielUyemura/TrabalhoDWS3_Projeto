var express = require('express');
var router = express.Router();
var alunoApp = require("../apps/aluno/controller/ctlAluno"); // Alterando para o controlador de Aluno

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    

    if (!isLogged) {      
        res.redirect("/Login");
    }
    next();
}; 

/* GET métodos */
router.get('/manutAluno', authenticationMiddleware, alunoApp.manutAluno);  // Alterando para manutAluno
router.get('/insertAluno', authenticationMiddleware, alunoApp.insertAluno);  // Alterando para insertAluno
router.get('/viewAluno/:id', authenticationMiddleware, alunoApp.viewAluno);  // Alterando para viewAluno
router.get('/updateAluno/:id', authenticationMiddleware, alunoApp.updateAluno);  // Alterando para updateAluno

/* POST métodos */
router.post('/insertAluno', authenticationMiddleware, alunoApp.insertAluno);  // Alterando para insertAluno
router.post('/updateAluno', authenticationMiddleware, alunoApp.updateAluno);  // Alterando para updateAluno
router.post('/deleteAluno', authenticationMiddleware, alunoApp.deleteAluno);  // Alterando para deleteAluno

module.exports = router;
