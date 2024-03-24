import * as express from "express";
import * as services from "../services/gratitudeLists.js";
const router = express.Router();

router.get("/", async function (req, res, next) {
  try {
    res.json(await services.getMultiple(req.query.page));
  } catch (err) {
    console.log("Error in route '/' for gratitudeLists", err.message);
    next(err);
  }
});

export { router };
