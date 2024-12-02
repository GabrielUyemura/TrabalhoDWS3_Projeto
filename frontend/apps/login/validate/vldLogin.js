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

    // Display validation errors if any
    if (errors) {
        const errorMessages = Object.values(errors).flat();            
        //alert(errorMessages[0]);
        return false;
    }
    return true;
}


module.exports = {
  constraints,
  Validar,
};
