const mdlDisciplina = require("../model/mdlDisciplina");

const getAllDisciplina = (req, res) =>
  (async () => {
    let registro = await mdlDisciplina.getAllDisciplina();

    // Formata a data para o formato yyyy-mm-dd
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.datavencimentodisciplina.toISOString().split('T')[0];
      row.datavencimentodisciplina = formattedDate;
    }
    res.json({ status: "ok", "registro": registro });
  })();

const getDisciplinaByID = (req, res) =>
  (async () => {
    const idDisciplina = parseInt(req.body.iddisciplina);
    let registro = await mdlDisciplina.getDisciplinaByID(idDisciplina);

    // Formata a data para o formato yyyy-mm-dd
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.datavencimentodisciplina.toISOString().split('T')[0];
      row.datavencimentodisciplina = formattedDate;
    }

    res.json({ status: "ok", "registro": registro });
  })();

const insertDisciplina = (request, res) =>
  (async () => {
    const disciplinaREG = request.body;
    let { msg, linhasAfetadas } = await mdlDisciplina.insertDisciplina(disciplinaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateDisciplina = (request, res) =>
  (async () => {
    const disciplinaREG = request.body;
    let { msg, linhasAfetadas } = await mdlDisciplina.updateDisciplina(disciplinaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteDisciplina = (request, res) =>
  (async () => {
    const disciplinaREG = request.body;
    let { msg, linhasAfetadas } = await mdlDisciplina.deleteDisciplina(disciplinaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllDisciplina,
  getDisciplinaByID,
  insertDisciplina,
  updateDisciplina,
  deleteDisciplina
};
