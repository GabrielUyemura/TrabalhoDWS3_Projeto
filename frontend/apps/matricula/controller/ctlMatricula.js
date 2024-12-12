const { Cookie } = require("express-session");
const moment = require("moment");
const axios = require("axios");

const ManutUsers = async (req, res) =>
  (async () => {
    if (req.method == "POST") {
      const formData = req.body;
      if (!validate.Validar(formData)) {
        return res.status(400).json({ status: "error", msg: "Dados de entrada validados" });
      };

      const resp = await axios.post(process.env.SERVIDOR_DW3Back + "/login", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      }).catch(error => {
        return res.status(400).json({ status: "error", msg: error.response.data.msg });
      });

      if (!resp.data) {
        return;
      }

      return res.json({ status: "ok", msg: "Login com sucesso!" });
    } else {    
      var parametros = { title: "SIAD - Manutenção de usuários" }
      res.render("30100admin/30110adminUser/view/vwAdminUser.njk", { parametros });
    }
  })();

const manutMatricula = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllMatricula", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(error => {
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível"

      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";

      } else {
        remoteMSG = error;
      }
      res.render("matricula/view/vwManutMatricula.njk", {
        title: "Manutenção de Matrícula",
        data: null,
        erro: remoteMSG, 
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }

    res.render("matricula/view/vwManutMatricula.njk", {
      title: "Manutenção de Matrícula",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertMatricula = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      const token = req.session.token;

      //@ Busca os Matricula disponíveis
      const matricula = await axios.get(
        process.env.SERVIDOR_DW3Back + "/GetAllMatricula", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        }
      });

      return res.render("matricula/view/vwFCrMatricula.njk", {
        title: "Cadastro de Matricula",
        data: null,
        erro: null,
        Matricula: matricula.data.registro,
        userName: null,
      });

    } else {
      const regData = req.body;
      const token = req.session.token;

      try {
        // @ Enviando dados para o servidor Backend
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertMatricula", regData, {
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

const viewMatricula = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        oper = req.params.oper;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMatriculaByID",
          {
            iddisciplinaaluno: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          //@ Busca os Matricula disponíveis
          const matricula = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllMatricula", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          });

          response.data.registro[0].datamatricula = moment(response.data.registro[0].datamatricula).format("YYYY-MM-DD");

          res.render("matricula/view/vwFRUDrMatricula.njk", {
            title: "Visualização de Matrícula",
            data: response.data.registro[0],
            disabled: true,
            Matricula: matricula.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlMatricula|ViewMatricula] ID de Matrícula não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlMatricula.js|ViewMatricula] Matrícula não localizado!" });
      console.log(
        "[ctlMatricula.js|viewMatricula] Try Catch: Erro não identificado",
        erro
      );
    }
  })();

const updateMatricula = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;
    try {
      if (req.method == "GET") {
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMatriculaByID",
          {
            iddisciplinaaluno: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          //@ Busca os Matricula disponíveis
          const matricula = await axios.get(
            process.env.SERVIDOR_DW3Back + "/GetAllMatricula", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}` // Set JWT token in the header
            }
          });

          response.data.registro[0].datamatricula = moment(response.data.registro[0].datamatricula).format(
            "YYYY-MM-DD"
          );

          res.render("matricula/view/vwFRUDrMatricula.njk", {
            title: "Atualização de dados de Matrícula",
            data: response.data.registro[0],
            disabled: false,
            matricula: matricula.data.registro,
            userName: userName,
          });
        } else {
          console.log("[ctlMatricula|UpdateMatricula] Dados não localizados");
        }
      } else {
        //@ POST
        const regData = req.body;
        const token = req.session.token;

        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateMatricula", regData, {
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
          console.error('[ctlMatricula.js|UpdateMatricula] Erro ao atualiza dados de Matrícula no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: response.data,
            erro: null,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlMatricula.js|UpdateMatricula] Matrícula não localizada!" });
      console.log(
        "[ctlMatricula.js|UpdateMatricula] Try Catch: Erro não identificado",
        erro
      );
    }

  })();

const deleteMatricula = async (req, res) =>
  (async () => {
    //@ POST
    const regData = req.body;
    const token = req.session.token;

    try {
      // @ Enviando dados para o servidor Backend
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/deleteMatricula", regData, {
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
      console.error('[ctlMatricula|DeleteMatricula] Erro ao excluir dados de Matricula no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: response.data,
        erro: null,
      });
    }
  })();

module.exports = {
  ManutUsers,
  manutMatricula,
  insertMatricula,
  viewMatricula,
  updateMatricula,
  deleteMatricula,
};