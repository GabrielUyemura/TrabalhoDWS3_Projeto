var express = require('express');
var router = express.Router();
var disciplinaApp = require("../apps/disciplina/controller/ctlDisciplina")

//Função necessária para evitar que usuários não autenticados acessem o sistema.
function authenticationMiddleware(req, res, next) {
    // Verificar se existe uma sessão válida.
    isLogged = req.session.isLogged;    
  
    if (!isLogged) {      
        res.redirect("/Login");
    }
    next();
}; 
  
router.get('/manutDisciplina', authenticationMiddleware, disciplinaApp.manutDisciplina)
router.get('/insertDisciplina', authenticationMiddleware, disciplinaApp.insertDisciplina);
router.get('/viewDisciplina/:id', authenticationMiddleware, disciplinaApp.viewDisciplina);
router.get('/updateDisciplina/:id', authenticationMiddleware, disciplinaApp.updateDisciplina);

router.post('/insertDisciplina', authenticationMiddleware, disciplinaApp.insertDisciplina);
router.post('/updateDisciplina', authenticationMiddleware, disciplinaApp.updateDisciplina);
router.post('/deleteDisciplina', authenticationMiddleware, disciplinaApp.deleteDisciplina);

module.exports = router;