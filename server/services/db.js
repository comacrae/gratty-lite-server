import mysql from "mysql2/promise";
import config from "../config.js";

async function queryDatabase({
  sqlString = null,
  values = null,
  options = null,
}) {
  try {
    let results = null;
    const connection = await mysql.createConnection(config.db);
    if (sqlString == null) {
      [results] = await connection.query(options);
    } else if (values == null && values == null) {
      [results] = await connection.query(sqlString);
    } else {
      [results] = await connection.query(sqlString, values);
    }
    connection.end();
    return results;
  } catch (err) {
    console.log(err);
  }
}

export { queryDatabase };
