const { Cookie } = require("express-session");
const moment = require("moment");
const axios = require("axios");
const { response } = require("express");

const manutMatricula = async (req, res) =>
  (async () => {
    // @ Abre o formulário de manutenção de Matrícula
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllMatricula", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        }
      });

      res.render("matricula/view/vwManutMatricula.njk", {
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

      res.render("matricula/view/vwManutMatricula.njk", {
        title: "",
        data: null,
        erro: remoteMSG, // @ Caso tenha da erro, a mensagem será mostrada na página html como um Alert
        userName: userName,
      });
    }
  })();

const insertMatricula = async (req, res) =>
  (async () => {
    if (req.method == "GET") {
      // @ Busca os alunos e disciplinas disponíveis
      const token = req.session.token;

      try {
        const alunos = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllAluno", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        const disciplinas = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllDisciplina", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        });

        res.render("matricula/view/vwFCrMatricula.njk", {
          title: "Cadastro de Matrícula",
          alunos: alunos.data.registro,
          disciplinas: disciplinas.data.registro,
          erro: null,
          userName: null,
        });
      } catch (error) {
        console.error('Erro ao buscar dados para cadastro de matrícula:', error.message);
        res.render("matricula/view/vwFCrMatricula.njk", {
          title: "Cadastro de Matrícula",
          alunos: [],
          disciplinas: [],
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
        const id = parseInt(req.params.id);

        matriculaResponse = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMatriculaByID",
          {
            idDisciplinaAluno: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (matriculaResponse.data.status == "ok") {
          try {
            const alunos = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllAluno", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            });

            const disciplinas = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllDisciplina", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            });

            const matricula = matriculaResponse.data.registro[0];
            matricula.datamatricula = moment(matricula.datamatricula).format("YYYY-MM-DD");

            res.render("matricula/view/vwFRUDrMatricula.njk", {
              title: "Visualizar Matrícula",
              data: matricula,
              disabled: true,
              alunos: alunos.data.registro,
              disciplinas: disciplinas.data.registro,
              userName: userName,
            });
          } catch (error) {
            console.error('Erro ao buscar dados para visualizar matrícula:', error.message);
            res.render("matricula/view/vwFRUDrMatricula.njk", {
              title: "Visualizar Matrícula",
              data: [],
              alunos: [],
              disciplinas: [],
              erro: "Erro ao buscar dados para visualizar.",
              userName: null,
            });
          }
        } else {
          console.log("[ctlMatricula|ViewMatricula] ID de Matrícula não localizado!");
        }

      }
    } catch (erro) {
      res.json({ status: "[ctlMatricula.js|ViewMatricula] Matrícula não localizada!" });
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

        matriculaResponse = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMatriculaByID",
          {
            idDisciplinaAluno: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (matriculaResponse.data.status == "ok") {
          try {
            const alunos = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllAluno", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            });

            const disciplinas = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllDisciplina", {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              }
            });

            const matricula = matriculaResponse.data.registro[0];
            matricula.datamatricula = moment(matricula.datamatricula).format("YYYY-MM-DD");

            res.render("matricula/view/vwFRUDrMatricula.njk", {
              title: "Editar Matrícula",
              data: matricula,
              disabled: false,
              alunos: alunos.data.registro,
              disciplinas: disciplinas.data.registro,
              userName: userName,
            });
          } catch (error) {
            console.error('Erro ao buscar dados para visualizar matrícula:', error.message);
            res.render("matricula/view/vwFRUDrMatricula.njk", {
              title: "Editar Matrícula",
              data: [],
              alunos: [],
              disciplinas: [],
              erro: "Erro ao buscar dados para visualizar.",
              userName: null,
            });
          }
        } else {
          console.log("[ctlMatricula|updateMatricula] Dados não localizados");
        }
      } else {
        // @ POST
        const regData = req.body;
        const token = req.session.token;

        try {
          // @ Enviando dados para o servidor Backend
          const response = await axios.put(process.env.SERVIDOR_DW3Back + "/updateMatricula", regData, {
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
          console.error('[ctlMatricula.js|UpdateMatricula] Erro ao atualizar dados de Matrícula no servidor backend:', error.message);
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
    const regData = req.body;
    const token = req.session.token;

    try {
      const response = await axios.delete(
        process.env.SERVIDOR_DW3Back + "/deleteMatricula",
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
  manutMatricula,
  insertMatricula,
  viewMatricula,
  updateMatricula,
  deleteMatricula,
};