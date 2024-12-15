var express = require('express');
var router = express.Router();
var loginApp = require("../apps/login/controller/ctlLogin")


function authenticationMiddleware(req, res, next) {
  isLogged = req.session.isLogged;

  if (!isLogged) {
    return res.redirect("/Login");
  }

  next();
};

router.get('/', authenticationMiddleware, function (req, res, next) {
  userName = req.session.userName;    
  parametros = { title: 'Home', Usuario: userName };

  res.render('home/view/index.njk', { parametros });
});

router.get('/Login', loginApp.Login);

router.post('/Login', loginApp.Login);

router.get('/Logout', loginApp.Logout);

module.exports = router;
