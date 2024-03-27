import express from "express";
import cors from "cors";
import { router as gratitudeListsRoute } from "./routes/gratitudeLists.js";
import { router as usersRoute } from "./routes/users.js";
import { router as followersRoute } from "./routes/followers.js";

import "dotenv/config.js";

const app = express();

const port = process.env.SERVER_PORT || 8081;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "Server listening" });
});

app.use("/api", gratitudeListsRoute);
app.use("/api", usersRoute);
app.use("/api", followersRoute);

app.use((err, req, res, next) => {
  const statusCode = res.statusCode || 500;
  console.log(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
});

app.listen(port, () => {
  console.log(
    `listening at http://${process.env.HOST}:${process.env.SERVER_PORT}`
  );
});
