const db = require("../../../database/databaseconfig");

const getAllMatricula = async () => {
  return (
    await db.query(
      "SELECT * FROM DisciplinaAluno " +
      "WHERE removido = false " +
      "ORDER BY dataMatricula ASC"
    )
  ).rows;
};

const getMatriculaByID = async (idMatriculaPAR) => {
  return (
    await db.query(
      "SELECT * FROM DisciplinaAluno " +
      "WHERE idDisciplinaAluno = $1 AND removido = false ",
      [idMatriculaPAR]
    )
  ).rows;
};

const insertMatricula = async (matriculaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO DisciplinaAluno " +
        "VALUES(default, $1, $2, $3, $4)",
        [
          matriculaREGPar.dataMatricula,
          matriculaREGPar.idAluno,
          matriculaREGPar.idDisciplina,
          matriculaREGPar.removido
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlMatricula|insertMatricula] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateMatricula = async (matriculaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE DisciplinaAluno SET " +
        "dataMatricula = $2, " +
        "idAluno = $3, " +
        "idDisciplina = $4, " +
        "removido = $5 " +
        "WHERE idDisciplinaAluno = $1",
        [
          matriculaREGPar.idDisciplinaAluno,
          matriculaREGPar.dataMatricula,
          matriculaREGPar.idAluno,
          matriculaREGPar.idDisciplina,
          matriculaREGPar.removido
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlMatricula|updateMatricula] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteMatricula = async (matriculaREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE DisciplinaAluno SET removido = true " +
        "WHERE idDisciplinaAluno = $1",
        [matriculaREGPar.idDisciplinaAluno]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlMatricula|deleteMatricula] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllMatricula,
  getMatriculaByID,
  insertMatricula,
  updateMatricula,
  deleteMatricula,
};
