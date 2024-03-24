import mysql from "mysql2/promise";
import config from "../config.js";

export default async function query(sql, params) {
  try {
    const connection = await mysql.createConnection(config.db);
    const [results] = await connection.execute(sql, params);
    return results;
  } catch (err) {
    console.log(err);
  }
}
