const mdlAluno = require("../model/mdlAluno");

const getAllAluno = (req, res) =>
  (async () => {
    let registro = await mdlAluno.getAllAluno();

    // Formata a data para o formato yyyy-mm-dd
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.datanasc.toISOString().split('T')[0];
      row.dataasc = formattedDate;
    }
    res.json({ status: "ok", "registro": registro });
  })();

const getAlunoByID = (req, res) =>
  (async () => {
    const idAluno = parseInt(req.body.idaluno);
    let registro = await mdlAluno.getAlunoByID(idAluno);

    // Formata a data para o formato yyyy-mm-dd
    for (let i = 0; i < registro.length; i++) {
      const row = registro[i];
      const formattedDate = row.datanasc.toISOString().split('T')[0];
      row.datanasc = formattedDate;
    }

    res.json({ status: "ok", "registro": registro });
  })();

const insertAluno = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAluno.insertAluno(alunoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const updateAluno = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAluno.updateAluno(alunoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

const deleteAluno = (request, res) =>
  (async () => {
    const alunoREG = request.body;
    let { msg, linhasAfetadas } = await mdlAluno.deleteAluno(alunoREG);
    res.json({ "status": msg, "linhasAfetadas": linhasAfetadas });
  })();

module.exports = {
  getAllAluno,
  getAlunoByID,
  insertAluno,
  updateAluno,
  deleteAluno
};

