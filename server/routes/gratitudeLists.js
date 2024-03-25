import * as express from "express";
import * as services from "../services/gratitudeLists.js";
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    res.json(await services.getPagedGratitudeLists(req.query.page));
  } catch (err) {
    console.log("Error in route '/' for gratitudeLists", err.message);
    next(err);
  }
});

router.get("/all-post-ids-by-author", async function (req, res, next) {
  try {
    res.json(await services.getPostIdsByAuthor(req.query.author_id));
  } catch (err) {
    console.log(
      "Error in route '/post-ids-by-author' for gratitudeLists",
      err.message
    );
    next(err);
  }
});

router.get("/all-post-text-by-author", async function (req, res, next) {
  try {
    const results = await services.getPostIdsAndTextByAuthor(
      req.query.author_id
    );
    res.json(results);
  } catch (err) {
    console.log(
      "Error in `/all-post-text-by-author` for gratitudeLists:",
      err.message
    );
    next(err.message);
  }
});

router.get("/post-by-author", async function (req, res, next) {
  try {
    const results = await services.getListTextByAuthorAndPost(
      req.query.post_id,
      req.query.author_id
    );
    res.json(results);
  } catch (err) {
    console.log("Error in `/post-by-author` for gratitudeLists:", err.message);
    next(err.message);
  }
});

router.get("/posts-by-author-since", async function (req, res, next) {
  try {
    const results = await services.getPostsByAuthorSince(
      req.query.created_at,
      req.query.author_id
    );
    res.json(results);
  } catch (err) {
    console.log(
      "Error in `/posts-by-author-since` for gratitudeLists:",
      err.message
    );
    next(err.message);
  }
});
export { router };
