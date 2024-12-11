const mdlCurso = require("../model/mdlCurso");

const getAllCurso = (req, res) =>
  (async () => {
    let registro = await mdlCurso.getAllCurso();

    // Formata a data para o formato yyyy-mm-dd
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.dataabertura.toISOString().split('T')[0];
      row.dataabertura = formattedDate;
    }
    res.json({ status: "ok", "registro": registro });
  })();

const getCursoByID = (req, res) =>
  (async () => {
    const idCurso = parseInt(req.body.idcurso);
    let registro = await mdlCurso.getCursoByID(idCurso);

    // Formata a data para o formato yyyy-mm-dd
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.dataabertura.toISOString().split('T')[0];
      row.dataabertura = formattedDate;
    }

    res.json({ status: "ok", "registro": registro });
  })();

const insertCurso = (request, res) =>
  (async () => {
    const cursoREG = request.body;
    let { msg, linhasAfetadas } = await mdlCurso.insertCurso(cursoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateCurso = (request, res) =>
  (async () => {
    const cursoREG = request.body;
    let { msg, linhasAfetadas } = await mdlCurso.updateCurso(cursoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteCurso = (request, res) =>
  (async () => {
    const cursoREG = request.body;
    let { msg, linhasAfetadas } = await mdlCurso.deleteCurso(cursoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllCurso,
  getCursoByID,
  insertCurso,
  updateCurso,
  deleteCurso
};
