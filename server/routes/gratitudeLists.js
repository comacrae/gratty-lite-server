import * as express from "express";
import {
  makePagedQuery,
  makeQuery,
  insertData,
} from "../services/service-helpers.js";
import { makeListPacket } from "../services/gratitudeLists.js";
const router = express.Router();

router.get("/authors", async function (req, res, next) {
  try {
    const results = await makeQuery({
      sql: "SELECT DISTINCT author_id FROM posts",
    });
    res.status(200).json({ status: "success", data: results });
  } catch (err) {
    console.log("Error in GET '/authors' for gratitudeLists:", err.message);
    res.status();
    next(err);
  }
});

router.get(
  "/authors/:authorId/gratitude-lists",
  async function (req, res, next) {
    try {
      const authorId = req.params.authorId;
      const results = await makeQuery({
        sql: `SELECT id, created_at FROM posts WHERE author_id =${authorId}`,
      });

      res.status(200).json({ status: "success", data: results });
    } catch (err) {
      console.log(
        `Error in GET'/authors/${authorId}/gratitude_lists' for gratitudeLists`,
        err.message
      );
      next(err);
    }
  }
);

router.get(
  "/authors/:authorId/gratitude-lists/:listId",
  async function (req, res, next) {
    try {
      const authorId = req.params.authorId;
      const listId = req.params.listId;
      const results = await makeQuery({
        sql: `SELECT item_id, item_text FROM posts_with_text WHERE author_id =${authorId} AND post_id = ${listId} ORDER BY item_id`,
      });

      res.status(200).json({ status: "success", data: results });
    } catch (err) {
      console.log(
        `Error in GET '/authors/${authorId}/gratitude_lists' for gratitudeLists`,
        err.message
      );
      next(err);
    }
  }
);

router.post(
  "/authors/:authorId/gratitude-lists",
  async function (req, res, next) {
    console.log("callling grat");
    try {
      let result = null;
      const authorId = parseInt(req.params.authorId);
      const listItems = req.body.listItems;
      result = await insertData({
        sql: `INSERT INTO posts (author_id) VALUES ?`,
        values: [[[authorId]]],
      });
      const resultId = result.insertId;
      console.log(resultId);
      const packet = makeListPacket(resultId, listItems);
      result = await insertData({
        sql: `INSERT INTO list_items (post_id, item_text) VALUES
        ?`,
        values: [packet],
      });
      res.status(200).json({ status: "success", data: result });
    } catch (err) {
      console.log(
        `Error in POST '/authors/:authorId/gratitude_lists' for gratitudeLists`,
        err.message
      );
      next(err);
    }
  }
);

export { router };
