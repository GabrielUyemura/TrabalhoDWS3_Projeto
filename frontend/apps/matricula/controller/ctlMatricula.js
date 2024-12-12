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
    // @ Abre o formulário de manutenção de Matrícula
    const userName = req.session.userName;
    const token = req.session.token;

    try {
      const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllMatricula", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` // Set JWT token in the header
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
        remoteMSG = error.message; // Use error.message for more informative messages
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
        const id = req.params.id;
        parseInt(id);

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMatriculaByID",
          {
            idmatricula: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          res.render("matricula/view/vwFRUDrMatricula.njk", {
            title: "Visualizar Matrícula",
            data: response.data.registro[0],
            disabled: true,
            userName: userName,
          });
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

        response = await axios.post(
          process.env.SERVIDOR_DW3Back + "/getMatriculaByID",
          {
            idmatricula: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.data.status == "ok") {
          res.render("matricula/view/vwFRUDrMatricula.njk", {
            title: "Editar Matrícula",
            data: response.data.registro[0],
            disabled: false,
            userName: userName,
          });
        } else {
          console.log("[ctlMatricula|updateMatricula] Dados não localizados");
        }
      } else {
        // @ POST
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