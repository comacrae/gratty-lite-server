import mysql from "mysql2/promise";
import config from "../config.js";

async function queryDatabase(options) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.query(options);

    connection.end();
    return results;
  } catch (err) {
    console.log(err);
  }
}

export { queryDatabase };
