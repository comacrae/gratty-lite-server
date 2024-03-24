import * as express from "express";
import * as services from "../services/listItems.js";

const router = express.Router();

router.get("/by-id/", async function (req, res, next) {
  try {
    const results = await services.getListItemsByPostId(req.query.post_id);
    res.json(results);
  } catch (err) {
    console.log("Error in `/` for listItems route: ", err.message);
    next(err.message);
  }
});

export { router };
