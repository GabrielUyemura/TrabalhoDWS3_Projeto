const axios = require("axios");
const moment = require("moment");

const manutCurso = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;

  try {
    const resp = await axios.get(process.env.SERVIDOR_DW3Back + "/getAllCurso", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    res.render("curso/view/vwManutCurso.njk", {
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

    res.render("curso/view/vwManutCurso.njk", {
      title: "",
      data: null,
      erro: remoteMSG,
      userName: userName,
    });
  }
};

const insertCurso = async (req, res) => {
  const token = req.session.token;

  if (req.method === "GET") {
    return res.render("curso/view/vwFCrCurso.njk", {
      title: "Cadastro de Curso",
      data: null,
      erro: null,
      userName: req.session.userName,
    });
  } else {
    const regData = req.body;

    try {
      const response = await axios.post(
        process.env.SERVIDOR_DW3Back + "/insertCurso",
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

const viewCurso = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  const id = req.params.id;

  if (!id) {
    console.log("[ctlCurso|ViewCurso] ID não fornecido");
    return res.json({ status: "Error", msg: "ID do Curso não fornecido" });
  }

  try {
    const response = await axios.post(
      process.env.SERVIDOR_DW3Back + "/getCursoByID",
      { idCurso: id },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.status === "ok") {
      response.data.registro[0].dataAbertura = moment(
        response.data.registro[0].dataAbertura
      ).format("YYYY-MM-DD");

      res.render("curso/view/vwFRUDrCurso.njk", {
        title: "Visualizar Curso",
        data: response.data.registro[0],
        disabled: true,
        userName: userName,
      });
    } else {
      console.log("[ctlCurso|ViewCurso] Curso não localizado!");
      res.json({ status: "Error", msg: "Curso não localizado!" });
    }
  } catch (error) {
    console.error("[ctlCurso|ViewCurso] Erro ao buscar curso:", error.message);
    res.json({ status: "Error", msg: "Erro ao buscar curso" });
  }
};

const updateCurso = async (req, res) => {
  const userName = req.session.userName;
  const token = req.session.token;
  const id = req.params.id;
  parseInt(id);

  if (req.method === "GET") {
    if (!id) {
      console.log("[ctlCurso|UpdateCurso] ID não fornecido");
      return res.json({ status: "Error", msg: "ID do curso não fornecido" });
    }

    try {
      const response = await axios.post(
        process.env.SERVIDOR_DW3Back + "/getCursoByID",
        { idCurso: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status === "ok") {
        response.data.registro[0].dataAbertura = moment(
          response.data.registro[0].dataAbertura
        ).format("YYYY-MM-DD");

        res.render("curso/view/vwFRUDrCurso.njk", {
          title: "Editar Curso",
          data: response.data.registro[0],
          disabled: false,
          userName: userName,
        });
      } else {
        console.log("[ctlCurso|UpdateCurso] Curso não localizado");
        res.json({ status: "Error", msg: "Curso não localizado" });
      }
    } catch (error) {
      console.error("[ctlCurso|UpdateCurso] Erro ao buscar curso:", error.message);
      res.json({ status: "Error", msg: "Erro ao buscar curso" });
    }
  } else {
    const regData = req.body;

    try {
      const response = await axios.put(
        process.env.SERVIDOR_DW3Back + "/updateCurso",
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
      console.error("[ctlCurso|UpdateCurso] Erro ao atualizar dados:", error.message);
      res.json({
        status: "Error",
        msg: error.message,
        data: null,
        erro: error.message,
      });
    }
  }
};

const deleteCurso = async (req, res) => {
  const regData = req.body;
  const token = req.session.token;

  try {
    const response = await axios.delete(
      process.env.SERVIDOR_DW3Back + "/deleteCurso",
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
    console.error("[ctlCurso|DeleteCurso] Erro ao deletar curso:", error.message);
    res.json({
      status: "Error",
      msg: error.message,
      data: null,
      erro: error.message,
    });
  }
};

module.exports = {
  manutCurso,
  insertCurso,
  viewCurso,
  updateCurso,
  deleteCurso,
};
