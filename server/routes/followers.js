import * as express from "express";
import * as serviceHelpers from "../services/service-helpers.js";

const router = express.Router();

router.get("/followers/:userId/following", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await serviceHelpers.makeQuery({
      sqlString: `SELECT followed_id , username FROM  followers INNER JOIN users ON followers.followed_id = users.id WHERE follower_id = ${userId}`,
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in GET /followers/:userId/following ");
    next(err);
  }
});

router.get("/followers/:userId/followed-by", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await serviceHelpers.makeQuery({
      sqlString: `SELECT follower_id, username FROM followers INNER JOIN users ON followers.follower_id = users.id WHERE followed_id = ${userId}`,
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in GET /followers/:userId/followed-by ");
    next(err);
  }
});

router.post("/followers/:userId/following", async function (req, res, next) {
  try {
    const followerId = req.params.userId;
    const followedId = req.body.data.followedId;
    const result = await serviceHelpers.insertData({
      sqlString: `INSERT INTO followers (follower_id, followed_id) VALUES  ?`,
      values: [[[followerId, followedId]]],
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in DELETE /followers/:userId/following");
    next(err);
  }
});

router.delete("/followers/:userId/following", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const followedId = req.body.data.followedId;
    const result = await serviceHelpers.deleteData({
      sqlString: `DELETE FROM followers WHERE follower_id = ${userId} AND followed_id = ${followedId}`,
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in DELETE /followers/:userId/following ");
    next(err);
  }
});

export { router };
