require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 3000;

const express = require("express");
const server = express();
const connectDatabase = require("./database/connect");

server.use(express.json());

server.get("/", (req, res) => {
  res.send("test");
});

const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    server.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
