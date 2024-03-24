import query from "./db.js";
import * as helper from "../helper.js";
import config from "../config.js";

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);
  const results = await query(
    `SELECT * FROM users LIMIT ${config.listPerPage} OFFSET ${offset}`
  );
  const meta = { page };
  const data = helper.checkNullRows(results);
  return { data, meta };
}

export { getMultiple };
