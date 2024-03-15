import mysql from "mysql2/promise";
const connection = await mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "grattylite",
});

try {
  const [results, fields] = await connection.query("SELECT * FROM `users`");
  console.log(results);
} catch (err) {
  console.log(`Error: ${err}`);
}
