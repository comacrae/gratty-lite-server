import queryDatabase from "./db.js";
import config from "../config.js";

async function getPagedResults(columns = "*", page = 1, table, where = null) {
  const query = `SELECT ${columns} FROM ${table} ${where ? where : ""}`;
  const results = await makePagedQuery(page, query);
  return results;
}

async function getUnpagedResults(columns = "*", table, where = null) {
  const query = `SELECT ${columns} FROM ${table} ${where ? where : ""}`;
  const results = await makeUnpagedQuery(query);
  return results;
}

async function makeUnpagedQuery(sqlQuery) {
  const results = await queryDatabase(sqlQuery);
  const data = checkNullRows(results);
  return data;
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

export { getPagedResults, getUnpagedResults };
