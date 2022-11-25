require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const connectDatabase = require("./database/connect");

const usersRouter = require("./routers/users");
const rankingsRouter = require("./routers/rankings");
const queuesRouter = require("./routers/queues");
const questionsRouter = require("./routers/questions");
const gamesRouter = require("./routers/games");
const accountsRouter = require("./routers/accounts");

app.use(express.json());
app.use("/users", usersRouter);
app.use("/rankings", rankingsRouter);
app.use("/queues", queuesRouter);
app.use("/questions", questionsRouter);
app.use("/games", gamesRouter);
app.use("/accounts", accountsRouter);

app.get("/", (req, res) => {
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
