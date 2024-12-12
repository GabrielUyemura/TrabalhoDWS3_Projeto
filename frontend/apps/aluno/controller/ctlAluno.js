const axios = require("axios");
const moment = require('moment');

const manutAluno = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllAluno", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }).catch(error => {
      let remoteMSG;
      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error;
      }
      res.render("aluno/view/vwManutAluno.njk", {
        title: "",
        data: null,
        erro: remoteMSG,
        userName: userName,
      });
    });

    if (!resp) {
      return;
    }

    res.render("aluno/view/vwManutAluno.njk", {
      title: "",
      data: resp.data.registro,
      erro: null,
      userName: userName,
    });
  })();

const insertAluno = async (req, res) =>
  (async () => {
    if (req.method === "GET") {
      const token = req.session.token;

      return res.render("aluno/view/vwFCrAluno.njk", {
        title: "Cadastro de Aluno",
        data: null,
        erro: null,
        userName: req.session.userName,
      });

    } else {
      const regData = req.body;
      const token = req.session.token;

      try {
        const response = await axios.post(process.env.SERVIDOR_DW3Back + "/insertAluno", regData, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          timeout: 5000,
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
          data: null,
          erro: error.message,
        });
      }
    }
  })();

const viewAluno = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method === "GET") {
        const id = req.params.id;

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAlunoByID",
          { idAluno: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "ok") {
          response.data.registro[0].dataNasc = moment(response.data.registro[0].dataNasc).format("YYYY-MM-DD");

          res.render("aluno/view/vwFRUDrAluno.njk", {
            title: "Visualizar Aluno",
            data: response.data.registro[0],
            disabled: true,
            userName: userName,
          });
        } else {
          console.log("[ctlAluno|ViewAluno] ID de Aluno não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlAluno.js|ViewAluno] Aluno não localizado!" });
      console.log("[ctlAluno.js|viewAluno] Try Catch: Erro não identificado", erro);
    }
  })();

const updateAluno = async (req, res) =>
  (async () => {
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      if (req.method === "GET") {
        const id = req.params.id;

        const response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getAlunoByID",
          { idAluno: id },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.status === "ok") {
          response.data.registro[0].dataNasc = moment(response.data.registro[0].dataNasc).format("YYYY-MM-DD");

          res.render("aluno/view/vwFRUDrAluno.njk", {
            title: "Editar Aluno",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlAluno|updateAluno] Dados não localizados");
        }
      } else {
        const regData = req.body;

        try {
          const response = await axios.post(process.env.SERVIDOR_DW3Back + "/updateAluno", regData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            timeout: 5000,
          });

          res.json({
            status: response.data.status,
            msg: response.data.status,
            data: response.data,
            erro: null,
          });
        } catch (error) {
          console.error('[ctlAluno.js|UpdateAluno] Erro ao atualizar dados no servidor backend:', error.message);
          res.json({
            status: "Error",
            msg: error.message,
            data: null,
            erro: error.message,
          });
        }
      }
    } catch (erro) {
      res.json({ status: "[ctlAluno.js|UpdateAluno] Aluno não localizado!" });
      console.log("[ctlAluno.js|UpdateAluno] Try Catch: Erro não identificado", erro);
    }
  })();

const deleteAluno = async (req, res) =>
  (async () => {
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.post(process.env.SERVIDOR_DW3Back + "/deleteAluno", regData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        timeout: 5000,
      });

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlAluno.js|DeleteAluno] Erro ao deletar dados no servidor backend:', error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: error.message,
      });
    }
  })();

module.exports = {
  manutAluno,
  insertAluno,
  viewAluno,
  updateAluno,
  deleteAluno
};
