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

router.get("/by-author", async function (req, res, next) {
  try {
    res.json(await services.getByAuthor(req.query.author_id));
  } catch (err) {
    console.log("Error in route '/by-author' for gratitudeLists", err.message);
    next(err);
  }
});

export { router };
