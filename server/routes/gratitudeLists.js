import * as express from "express";
import * as serviceHelpers from "../services/service-helpers.js";
import * as gratListServices from "../services/gratitudeLists.js";
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
      const results = await serviceHelpers.makeQuery({
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
      const results = await serviceHelpers.makeQuery({
        sql: `SELECT item_id, item_text,author_id FROM posts_with_text WHERE author_id =${authorId} AND post_id = ${listId} ORDER BY item_id`,
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
    try {
      let result = null;
      const authorId = parseInt(req.params.authorId);
      const listItems = req.body.listItems;
      result = await serviceHelpers.insertData({
        sql: `INSERT INTO posts (author_id) VALUES ?`,
        values: [[[authorId]]],
      });
      const resultId = result.insertId;
      const packet = gratListServices.makeListPacket(resultId, listItems);
      result = await serviceHelpers.insertData({
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

router.delete(
  "/authors/:authorId/gratitude-lists/:postId",
  async function (req, res, next) {
    try {
      console.log(req.params);
      const postId = parseInt(req.params.postId);
      const authorId = parseInt(req.params.authorId);
      const result = await serviceHelpers.deleteData({
        sql: `DELETE FROM posts WHERE id = ${postId} AND author_id = ${authorId}`,
      });
      res.status(200).json({ status: "success", data: result });
    } catch (err) {
      console.log(
        "Error in DELETE /authors/:authorId/gratitude-lists/:postId: "
      );
      next(err);
    }
  }
);

router.put(
  "/authors/:authorId/gratitude-lists/:postId",
  async function (req, res, next) {
    try {
      const authorId = parseInt(req.params.authorId);
      const postId = parseInt(req.params.postId);
      const listItems = req.body.listItems;
      const packet = gratListServices.makeUpdatePacket(postId, listItems);
      for (const item of packet) {
        const result = await serviceHelpers.makeQuery({
          sqlString: `UPDATE list_items SET item_text = ? WHERE id = ? AND post_id = ?`,
          values: item,
        });
      }
      res.status(200).json({ status: "success", data: {} });
    } catch (err) {
      console.log("Error in PUT /authors/:authorId/gratitude-lists/:postId");
      next(err);
    }
  }
);

export { router };
