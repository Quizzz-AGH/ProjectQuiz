require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 3000;

const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);
const connectDatabase = require("./database/connect");
const authenticate = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");

const usersRouter = require("./routers/users");
const rankingsRouter = require("./routers/rankings");
const queuesRouter = require("./routers/queues");
const questionsRouter = require("./routers/questions");
const gamesRouter = require("./routers/games");
const accountsRouter = require("./routers/accounts");

app.use(express.json());
app.use(cors());

app.use("/users", authenticate, usersRouter);
app.use("/rankings", authenticate, rankingsRouter);
app.use("/queues", authenticate, queuesRouter);
app.use("/questions", authenticate, questionsRouter);
app.use("/games", authenticate, gamesRouter);
app.use("/accounts", accountsRouter);

app.use(errorHandlerMiddleware);

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
