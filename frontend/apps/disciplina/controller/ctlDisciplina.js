const { Cookie } = require("express-session");
const moment = require('moment');
const axios = require("axios");
const { response } = require("express");

const manutDisciplina = async (req, res) =>
  (async () => {
    //@ Abre o formulário de manutenção de Disciplina
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllDisciplina", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      res.render("disciplina/view/vwManutDisciplina.njk", {
        title: "",
        data: resp.data.registro,
        erro: null,
        userName: userName,
      });
    } catch (error) {
      let remoteMSG;

      if (error.code === "ECONNREFUSED") {
        remoteMSG = "Servidor indisponível";
      } else if (error.code === "ERR_BAD_REQUEST") {
        remoteMSG = "Usuário não autenticado";
      } else {
        remoteMSG = error.message;
      }

      res.render("disciplina/view/vwManutDisciplina.njk", {
        title: "",
        data: null,
        erro: remoteMSG, // @ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: userName,
      });
    }
  })();


const insertDisciplina = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      // @ Busca os cursos disponíveis
      const token = req.session.token;

      try {
        const cursos = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCurso", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        res.render("disciplina/view/vwFCrDisciplina.njk", {
          title: "Cadastro de Disciplina",
          cursos: cursos.data.registro,
          erro: null,
          userName: null,
        });
      } catch (error) {
        console.error('Erro ao buscar dados para cadastro de disciplina:', error.message);
        res.render("disciplina/view/vwFCrDisciplina.njk", {
          title: "Cadastro de Disciplina",
          cursos: [],
          erro: "Erro ao buscar dados para cadastro.",
          userName: null,
        });
      }

    } else {
      // @ POST
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
        const id = parseInt(req.params.id);

        disciplinaResponse = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getDisciplinaByID",
          {
            idDisciplina: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (disciplinaResponse.data.status == "ok") {
          try {
            const cursos = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCurso", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            });

            const disciplina = disciplinaResponse.data.registro[0];
            disciplina.dataaberturadisciplina = moment(disciplina.dataaberturadisciplina).format("YYYY-MM-DD");

            res.render("disciplina/view/vwFRUDrDisciplina.njk", {
              title: "Visualizar Disciplina",
              data: disciplina,
              disabled: true,
              cursos: cursos.data.registro,
              userName: userName,
            });
          } catch (error) {
            console.error('Erro ao buscar dados para visualizar disciplina:', error.message);
            res.render("disciplina/view/vwFRUDrDisciplina.njk", {
              title: "Visualizar Disciplina",
              data: [],
              cursos: [],
              disciplinas: [],
              erro: "Erro ao buscar dados para visualizar.",
              userName: null,
            });
          }
        } else {
          console.log("[ctlDisciplina|ViewDisciplina] ID de Disciplina não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlDisciplina.js|ViewDisciplina] Disciplina não localizada!" });
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

        disciplinaResponse = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getDisciplinaByID",
          {
            idDisciplina: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (disciplinaResponse.data.status == "ok") {
          try {
            const cursos = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCurso", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            });

            const disciplina = disciplinaResponse.data.registro[0];
            disciplina.datadisciplina = moment(disciplina.datadisciplina).format("YYYY-MM-DD");

            res.render("disciplina/view/vwFRUDrDisciplina.njk", {
              title: "Editar Disciplina",
              data: disciplina,
              disabled: false,
              cursos: cursos.data.registro,
              userName: userName,
            });
          } catch (error) {
            console.error('Erro ao buscar dados para visualizar disciplina:', error.message);
            res.render("disciplina/view/vwFRUDrDisciplina.njk", {
              title: "Editar Disciplina",
              data: [],
              cursos: [],
              disciplinas: [],
              erro: "Erro ao buscar dados para visualizar.",
              userName: null,
            });
          }
        } else {
          console.log("[ctlDisciplina|updateDisciplina] Dados não localizados");
        }
      } else {
        // @ POST
        const regData = req.body;
        const token = req.session.token;

        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.put(process.env.SERVIDOR_DW3Back + "/updateDisciplina", regData, {
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
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.delete(
        process.env.SERVIDOR_DW3Back + "/deleteDisciplina",
        {
          data: regData,
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          timeout: 5000,
        }
      );

      res.json({
        status: response.data.status,
        msg: response.data.status,
        data: response.data,
        erro: null,
      });
    } catch (error) {
      console.error('[ctlDisciplina|DeleteDisciplina] Erro ao excluir dados de Disciplina no servidor backend:', error.message);
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
  deleteDisciplina,
};