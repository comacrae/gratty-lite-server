import { queryDatabase } from "./db.js";
import config from "../config.js";

function getTime() {
  const date = new Date();
  return (
    date.toISOString().split("T")[0] + " " + date.toTimeString().split(" ")[0]
  );
}

async function deleteData(options) {
  const results = await queryDatabase(options);
  return results;
}
async function makeQuery(options) {
  const results = await queryDatabase(options);
  console.log(results);
  const data = checkNullRows(results);
  return data;
}

async function insertData(options) {
  const queryResults = await queryDatabase(options);
  return queryResults;
}

async function makePagedQuery(page = 1, sqlQuery) {
  const offset = getOffset(page, config.listPerPage);
  const results = await queryDatabase(
    `${sqlQuery} LIMIT ${config.listPerPage} OFFSET ${offset}`
  );
  const meta = { page };
  const data = checkNullRows(results);
  return { data, meta };
}

function checkNullRows(rows) {
  if (rows == null) {
    return [];
  } else {
    return rows;
  }
}

function getOffset(currentPage = 1, listPerPage) {
  return (currentPage - 1) * [listPerPage];
}

export { makePagedQuery, makeQuery, insertData, getTime, deleteData };
