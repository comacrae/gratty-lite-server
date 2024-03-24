import "dotenv/config.js";

const config = {
  db: {
    host: process.env.HOST,
    user: process.env.SERVER_UNAME,
    password: process.env.SERVER_PWORD,
    database: "grattylite",
    connectTimeout: 60000,
  },
  listPerPage: 10,
};

export default config;
