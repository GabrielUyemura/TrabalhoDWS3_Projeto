const db = require("../../../database/databaseconfig");

const getAllAluno = async () => {
  return (
    await db.query(
      "SELECT * FROM Aluno " +
        "WHERE removido = false " + 
        "ORDER BY titulo ASC"
    )
  ).rows;
};

const getAlunoByID = async (idAlunoPAR) => {
  return (
    await db.query(
      "SELECT * FROM Aluno " +
        "WHERE idAluno = $1 AND removido = false " +
        "ORDER BY titulo ASC",
      [idAlunoPAR]
    )
  ).rows;
};

const insertAluno = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "INSERT INTO aluno " + "VALUES(default, $1, $2, $3, $4, $5)",
        [
          alunoREGPar.titulo,
          alunoREGPar.dataNasc,
          alunoREGPar.renda,
          alunoREGPar.documento,
          alunoREGPar.removido
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAluno|insertAluno] " + error.detail;
    linhasAfetadas = -1;
  }
  return { msg, linhasAfetadas };
};

const updateAluno = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";
  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE aluno SET " +
          "titulo = $2, " +
          "dataNasc = $3, " +
          "renda = $4, " +
          "documento = $5," +
          "removido = $6 " +
          "WHERE idAluno= $1",
        [
          alunoREGPar.idAluno,
          alunoREGPar.titulo,
          alunoREGPar.dataNasc,
          alunoREGPar.renda,
          alunoREGPar.documento,
          alunoREGPar.removido,
        ]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAluno|updateAluno] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

const deleteAluno = async (alunoREGPar) => {
  let linhasAfetadas;
  let msg = "ok";

  try {
    linhasAfetadas = (
      await db.query(
        "UPDATE aluno SET removido = true " + 
            "WHERE idAluno = $1",
        [alunoREGPar.idAluno]
      )
    ).rowCount;
  } catch (error) {
    msg = "[mdlAluno|deleteAluno] " + error.detail;
    linhasAfetadas = -1;
  }

  return { msg, linhasAfetadas };
};

module.exports = {
  getAllAluno,
  getAlunoByID,
  insertAluno,
  updateAluno,
  deleteAluno,
};
