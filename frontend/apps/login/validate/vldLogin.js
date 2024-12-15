var validate = require("validate.js");


const constraints = {
  LoginUsuario: {
    presence: true,
      length: {
          minimum: 1,
          message: " é obrigatório!"
      }            
  },
  SenhaUsuario: {     
      length: {
          minimum: 1,
          message: " é obrigatório!"
      }
  },  
};


function Validar(formDataPar) {

    const errors = validate(formDataPar, constraints);

    if (errors) {
        const errorMessages = Object.values(errors).flat(); 
        return false;
    }
    return true;
}


module.exports = {
  constraints,
  Validar,
};
