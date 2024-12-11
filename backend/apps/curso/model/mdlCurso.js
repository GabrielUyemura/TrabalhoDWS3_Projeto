const db = require("../../../database/databaseconfig");

const getAllCurso = async () => {
  return (
    await db.query(
      "SELECT * FROM curso " +
        "WHERE removido = false " + 
        "ORDER BY titulo ASC"
    )
  ).rows;
};

const getCursoByID = async (idCursoPAR) => {
  return (
    await db.query(
      "SELECT * FROM curso " +
        "WHERE idCurso = $1 AND removido = false " +
        "ORDER BY titulo ASC",
      [idCursoPAR]
    )
  ).rows;
};

const insertCurso = async (cursoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO curso " + "VALUES(default, $1, $2, $3, $4)",
        [
          cursoREGPar.titulo,
          cursoREGPar.dataAbertura,
          cursoREGPar.cargaHoraria,
          cursoREGPar.removido
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCurso|insertCurso] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateCurso = async (cursoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE curso SET " +
          "titulo = $2, " +
          "dataAbertura = $3, " +
          "cargaHoraria = $4, " +
          "removido = $5 " +
          "WHERE idCurso= $1",
        [
          cursoREGPar.idCurso,
          cursoREGPar.titulo,
          cursoREGPar.dataAbertura,
          cursoREGPar.cargaHoraria,
          cursoREGPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCurso|insertCurso] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteCurso = async (cursoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE curso SET removido = true " + 
            "WHERE idCurso = $1",
        [cursoREGPar.idCurso]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlCurso|deleteCurso] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllCurso,
  getCursoByID,
  insertCurso,
  updateCurso,
  deleteCurso,
};
