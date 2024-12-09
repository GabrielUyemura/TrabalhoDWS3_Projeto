const { Cookie } = require("express-session");
const axios = require("axios");
const moment = require('moment');

const manutDisciplina = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de Disciplina
    const userName = req.session.userName;
    const token = req.session.token;

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllDisciplina", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}` // Set JWT token in the header
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível"

      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";

      } else {
        remoteMSG = error;
      }
      res.render("disciplina/view/vwManutDisciplina.njk", {
        title: "",
        data: null,
        erro: remoteMSG, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }


    res.render("disciplina/view/vwManutDisciplina.njk", {
      title: "",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();


const insertDisciplina = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      //@ Busca os cursos disponíveis
      const cursos = await axios.get(
        process.env.SERVIDOR_DW3Back + "/getAllDisciplina", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
        }
      });

      return res.render("disciplina/view/vwFCrDisciplina.njk", {
        title: "Cadastro de Disciplina",
        data: null,
        erro: null, //@ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: null,
      });

    } else {
      //@ POST
      const regData = req.body;
      const token = req.session.token;

      try {
        // @ Enviando dados para o servidor Backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertDisciplina", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000, // @ 5 segundos de timeout
        });

        res.json({
          status: response.data.status,
          msg: response.data.status,
          data: response.data,
          erro: null,
        });
      } catch (error) {
        console.error('Erro ao inserir dados no servidor backend:', error.message);
        res.json({
          status: "Error",
          msg: error.message,
          data: response.data,
          erro: null,
        });
      }
    }
  })();

const viewDisciplina = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);


        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getDisciplinaByID",
          {
            iddisciplina: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {

          response.data.registro[0].datavencimentodisciplina = moment(response.data.registro[0].datavencimentodisciplina).format(
            "YYYY-MM-DD"
          );

          res.render("disciplina/view/vwFRUDrDisciplina.njk", {
            title: "Visualizar Disciplina",
            data: response.data.registro[0],
            disabled: true,
            userName: userName,
          });
        } else {
          console.log("[ctlDisciplina|ViewDisciplina] ID de Disciplina não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlDisciplina.js|ViewDisciplina] Disciplina não localizado!" });
      console.log(
        "[ctlDisciplina.js|viewDisciplina] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const updateDisciplina = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getDisciplinaByID",
          {
            iddisciplina: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          response.data.registro[0].datavencimentodisciplina = moment(response.data.registro[0].datavencimentodisciplina).format(
            "YYYY-MM-DD"
          );

          res.render("disciplina/view/vwFRUDrDisciplina.njk", {
            title: "Editar Disciplina",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlDisciplina|updateDisciplina] Dados não localizados");
        }
      } else {
        //@ POST
        const regData = req.body;
        const token = req.session.token;
  
        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateDisciplina", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000, // @ 5 segundos de timeout
          });

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlDisciplina.js|UpdateDisciplina] Erro ao atualizar dados de Disciplina no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlDisciplina.js|UpdateDisciplina] Disciplina não localizada!" });
      console.log(
        "[ctlDisciplina.js|UpdateDisciplina] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const deleteDisciplina = async (req, res) =>
  (async () => {
    //@ POST
    const regData = req.body;
    const token = req.session.token;

    try {
      // @ Enviando dados para o servidor Backend
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/deleteDisciplina", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000, // @ 5 segundos de timeout
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlDisciplina.js|DeleteDisciplina] Erro ao deletar dados de Disciplina no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: response.data,
        erro: null,
      });
    }
  })();

module.exports = {
  manutDisciplina,
  insertDisciplina,
  viewDisciplina,
  updateDisciplina,
  deleteDisciplina
};
