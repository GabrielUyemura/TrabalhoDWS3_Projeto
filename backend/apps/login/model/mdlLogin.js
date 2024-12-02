const db = require("../../../database/databaseconfig");

const getCredencial = async (loginPAR) => {
  const result = await db.query(
    "SELECT loginUsuario, senhaUsuario " +
        "FROM usuario WHERE loginUsuario = $1 AND removidoUsuario = false",
    [loginPAR]
  );
  return result.rows;
};
module.exports = {
  getCredencial
};
