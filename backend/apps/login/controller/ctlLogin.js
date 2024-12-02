const jwt = require("jsonwebtoken");
const bCrypt = require("bcryptjs");
const mdlLogin = require("../model/mdlLogin");

const login = async (req, res, next) => { 
  
  const credencial = await mdlLogin.getCredencial(req.body.LoginUsuario);    
   
  if (credencial.length == 0) {
    return res.status(403).json({ message: "Usuário não identificado!" });    
  }  

  if (bCrypt.compareSync(req.body.SenhaUsuario, credencial[0].senhausuario)) {
    const loginUsuario = credencial[0].loginusuario;
    const token = jwt.sign({ loginUsuario }, process.env.SECRET_API, {
      expiresIn: 120*60, //@ Expira em 02 horas
    });
    return res.json({ auth: true, token: token });
  }

  res.status(403).json({ message: "Login inválido!" });
};

function autenticaJWT(req, res, next) {
  const tokenHeader = req.headers["authorization"];
  if (!tokenHeader)
    return res
      .status(200)
      .json({ auth: false, message: "Não foi informado o token JWT" });

  const bearer = tokenHeader.split(" ");
  const token = bearer[1];

  jwt.verify(token, process.env.SECRET_API, function (err, decoded) {
    if (err)
      return res
        .status(200)
        .json({ auth: false, message: "JWT inválido ou expirado" });

    req.idUsuario = decoded.id;
    next();
  });
}

const logout = (req, res, next) => {
  res.json({ auth: false, token: null });
};

module.exports = {
  login,
  logout,
  autenticaJWT,
};
