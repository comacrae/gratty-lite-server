import * as express from "express";
import * as services from "../services/gratitudeLists.js";
import {
  makePagedQuery,
  makeUnpagedQuery,
} from "../services/service-helpers.js";
const router = express.Router();

router.get("/authors", async function (req, res, next) {
  try {
    const results = await makeUnpagedQuery(
      "SELECT DISTINCT author_id FROM posts"
    );
    res.status(200).json({ status: "success", data: results });
  } catch (err) {
    console.log("Error in route '/' for gratitudeLists", err.message);
    res.status();
    next(err);
  }
});

router.get(
  "/authors/:authorId/gratitude-lists",
  async function (req, res, next) {
    try {
      const authorId = req.params.authorId;
      const results = await makeUnpagedQuery(
        `SELECT id, created_at FROM posts WHERE author_id =${authorId}`
      );

      res.status(200).json({ status: "success", data: results });
    } catch (err) {
      console.log(
        `Error in route '/authors/${authorId}/gratitude_lists' for gratitudeLists`,
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
      const results = await makeUnpagedQuery(
        `SELECT item_id, item_text FROM posts_with_text WHERE author_id =${authorId} AND post_id = ${listId} ORDER BY item_id`
      );

      res.status(200).json({ status: "success", data: results });
    } catch (err) {
      console.log(
        `Error in route '/authors/${authorId}/gratitude_lists' for gratitudeLists`,
        err.message
      );
      next(err);
    }
  }
);

export { router };
