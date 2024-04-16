import * as express from "express";
import * as serviceHelpers from "../services/service-helpers.js";

const router = express.Router();

router.get("/users", async function (req, res, next) {
  try {
    const result = await serviceHelpers.makeQuery({
      sqlString: `SELECT * FROM users`,
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in GET /users ");
    next(err);
  }
});

router.get("/users/by-id/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await serviceHelpers.makeQuery({
      sqlString: `SELECT * FROM users WHERE id = ${userId}`,
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in GET /users/by-id/:userId ");
    next(err);
  }
});

router.get("/users/user-id/:username", async function (req, res, next) {
  const username = req.params.username;
  try {
    const result = await serviceHelpers.makeQuery({
      sqlString: `SELECT id FROM users WHERE username = "${username}"`,
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in GET /users/user-id/:username");
    next(err);
  }
});

router.get("/users/by-username/:username", async function (req, res, next) {
  try {
    console.log(username);
    const username = req.params.username;
    const result = await serviceHelpers.makeQuery({
      sqlString: `SELECT * FROM users WHERE username = "${username}"`,
    });
    return res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in '/users/by-username/:username'", err);
    next(err);
  }
});

router.post("/users", async function (req, res, next) {
  try {
    const firstName = req.body.data.firstName;
    const lastName = req.body.data.lastName;
    const username = req.body.data.username;
    const result = await serviceHelpers.insertData({
      sqlString: `INSERT INTO users (username, first_name, last_name) VALUES  ?`,
      values: [[[username, firstName, lastName]]],
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in POST /users ");
    next(err);
  }
});

router.delete("/users/:userId", async function (req, res, next) {
  try {
    const userId = req.params.userId;
    const result = await serviceHelpers.deleteData({
      sqlString: `DELETE FROM users WHERE id = ${userId} `,
    });
    res.status(200).json({ status: "success", data: result });
  } catch (err) {
    console.log("Error in DELETE /users ");
    next(err);
  }
});

export { router };
