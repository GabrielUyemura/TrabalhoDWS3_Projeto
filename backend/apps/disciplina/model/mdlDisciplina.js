const db = require("../../../database/databaseconfig");

const getAllDisciplina = async () => {
  return (
    await db.query(
      "SELECT * FROM disciplina " +
        "WHERE removidoDisciplina = false " + 
        "ORDER BY dataAberturaDisciplina ASC"
    )
  ).rows;
};

const getDisciplinaByID = async (idDisciplinaPAR) => {
  return (
    await db.query(
      "SELECT * FROM disciplina " +
        "WHERE idDisciplina = $1 AND removidoDisciplina = false " +
        "ORDER BY dataAberturaDisciplina ASC",
      [idDisciplinaPAR]
    )
  ).rows;
};

const insertDisciplina = async (disciplinaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO disciplina " + "VALUES(default, $1, $2, $3, $4)",
        [
          disciplinaREGPar.tituloDisciplina,
          disciplinaREGPar.chDisciplina,
          disciplinaREGPar.dataAberturaDisciplina,
          disciplinaREGPar.removidoDisciplina
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlDisciplina|insertDisciplina] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateDisciplina = async (disciplinaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE disciplina SET " +
          "tituloDisciplina = $2, " +
          "chDisciplina = $3, " +
          "dataAberturaDisciplina = $4, " +
          "removidoDisciplina = $5 " +
          "WHERE idDisciplina = $1",
        [
          disciplinaREGPar.idDisciplina,
          disciplinaREGPar.tituloDisciplina,
          disciplinaREGPar.chDisciplina,
          disciplinaREGPar.dataAberturaDisciplina,
          disciplinaREGPar.removidoDisciplina,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlDisciplina|insertDisciplina] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteDisciplina = async (disciplinaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE disciplina SET removidoDisciplina = true " + 
            "WHERE idDisciplina = $1",
        [disciplinaREGPar.iddisciplina]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlDisciplina|deleteDisciplina] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllDisciplina,
  getDisciplinaByID,
  insertDisciplina,
  updateDisciplina,
  deleteDisciplina,
};
