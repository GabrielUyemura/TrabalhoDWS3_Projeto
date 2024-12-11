const mdlMatricula = require("../model/mdlMatricula");

const getAllMatricula = (req, res) =>
  (async () => {
    let registro = await mdlMatricula.getAllMatricula();

    for (let i = 0; i < registro.length; i++) {
      const row = registro[i]; // Current row      
      const formattedDate = row.datamatricula.toISOString().split('T')[0];
      row.datamatricula = formattedDate;
    }
    res.json({ status: "ok", "registro": registro });
  })();

const getMatriculaByID = (req, res) =>
  (async () => {
    const idMatricula = parseInt(req.body.idDisciplinaAluno);
    let registro = await mdlMatricula.getMatriculaByID(idMatricula);

    // Formata a data para o formato yyyy-mm-dd
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.datamatricula.toISOString().split('T')[0];
      row.datamatricula = formattedDate;
    }

    res.json({ status: "ok", "registro": registro });
  })();

const insertMatricula = (request, res) =>
  (async () => {
    const matriculaREG = request.body;
    let { msg, linhasAfetadas } = await mdlMatricula.insertMatricula(matriculaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateMatricula = (request, res) =>
  (async () => {
    const matriculaREG = request.body;
    let { msg, linhasAfetadas } = await mdlMatricula.updateMatricula(matriculaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteMatricula = (request, res) =>
  (async () => {
    const matriculaREG = request.body;
    let { msg, linhasAfetadas } = await mdlMatricula.deleteMatricula(matriculaREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllMatricula,
  getMatriculaByID,
  insertMatricula,
  updateMatricula,
  deleteMatricula
};
