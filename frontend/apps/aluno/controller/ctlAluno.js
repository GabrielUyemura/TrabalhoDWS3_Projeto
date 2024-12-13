const axios = require("axios");
const moment = require("moment");

const manutAluno = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;

  try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllAluno", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.render("aluno/view/vwManutAluno.njk", {
      title: "",
      data: resp.data.registro || [],
      erro: null,
      userName: userName,
    });
  } catch (error) {
    let remoteMSG = "Erro desconhecido";
    if (error.code === "ECONNREFUSED") {
      remoteMSG = "Servidor indisponível";
    } else if (error.code === "ERR_BAD_REQUEST") {
      remoteMSG = "Usuário não autenticado";
    }

    res.render("aluno/view/vwManutAluno.njk", {
      title: "",
      data: null,
      erro: remoteMSG,
      userName: userName,
    });
  }
};

const insertAluno = async (req, res) => {
  const token = req.session.token;

  if (req.method === "GET") {
    return res.render("aluno/view/vwFCrAluno.njk", {
      title: "Cadastro de Aluno",
      data: null,
      erro: null,
      userName: req.session.userName,
    });
  } else {
    const regData = req.body;

    try {
      const response = await axios.post(
        process.env.SERVIDOR_DW3Back + "/insertAluno",
        regData,
        {
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
      console.error("Erro ao inserir dados no servidor backend:", error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: error.message,
      });
    }
  }
};

const viewAluno = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  const id = req.params.id;

  if (!id) {
    console.log("[ctlAluno|ViewAluno] ID não fornecido");
    return res.json({ status: "Error", msg: "ID do aluno não fornecido" });
  }

  try {
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
      response.data.registro[0].dataNasc = moment(
        response.data.registro[0].dataNasc
      ).format("YYYY-MM-DD");

      res.render("aluno/view/vwFRUDrAluno.njk", {
        title: "Visualizar Aluno",
        data: response.data.registro[0],
        disabled: true,
        userName: userName,
      });
    } else {
      console.log("[ctlAluno|ViewAluno] Aluno não localizado!");
      res.json({ status: "Error", msg: "Aluno não localizado!" });
    }
  } catch (error) {
    console.error("[ctlAluno|ViewAluno] Erro ao buscar aluno:", error.message);
    res.json({ status: "Error", msg: "Erro ao buscar aluno" });
  }
};

const updateAluno = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  const id = req.params.id;

  if (req.method === "GET") {
    if (!id) {
      console.log("[ctlAluno|UpdateAluno] ID não fornecido");
      return res.json({ status: "Error", msg: "ID do aluno não fornecido" });
    }

    try {
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
        response.data.registro[0].dataNasc = moment(
          response.data.registro[0].dataNasc
        ).format("YYYY-MM-DD");

        res.render("aluno/view/vwFRUDrAluno.njk", {
          title: "Editar Aluno",
          data: response.data.registro[0],
          disabled: false,
          userName: userName,
        });
      } else {
        console.log("[ctlAluno|UpdateAluno] Aluno não localizado");
        res.json({ status: "Error", msg: "Aluno não localizado" });
      }
    } catch (error) {
      console.error("[ctlAluno|UpdateAluno] Erro ao buscar aluno:", error.message);
      res.json({ status: "Error", msg: "Erro ao buscar aluno" });
    }
  } else {
    const regData = req.body;

    try {
      const response = await axios.post(
        process.env.SERVIDOR_DW3Back + "/updateAluno",
        regData,
        {
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
      console.error("[ctlAluno|UpdateAluno] Erro ao atualizar dados:", error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: error.message,
      });
    }
  }
};

const deleteAluno = async (req, res) => {
  const regData = req.body;
  const token = req.session.token;

  try {
    const response = await axios.post(
      process.env.SERVIDOR_DW3Back + "/deleteAluno",
      regData,
      {
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
    console.error("[ctlAluno|DeleteAluno] Erro ao deletar aluno:", error.message);
    res.json({
      status: "Error",
      msg: error.message,
      data: null,
      erro: error.message,
    });
  }
};

module.exports = {
  manutAluno,
  insertAluno,
  viewAluno,
  updateAluno,
  deleteAluno,
};
