require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 3000;

const express = require("express");
const server = express();
const connectDatabase = require("./database/connect");

server.use(express.json());

const usersRouter = require("./routers/users");
server.use("/users", usersRouter);

const rankingsRouter = require("./routers/rankings");
server.use("/rankings", rankingsRouter);

const queuesRouter = require("./routers/queues");
server.use("/queues", queuesRouter);

const questionsRouter = require("./routers/questions");
server.use("/questions", questionsRouter);

const gamesRouter = require("./routers/games");
server.use("/games", gamesRouter);

const accountsRouter = require("./routers/accounts");
server.use("/accounts", accountsRouter);

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
