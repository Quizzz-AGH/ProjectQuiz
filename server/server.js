// config and wrapper
require("dotenv").config();
require("express-async-errors");
const port = process.env.PORT || 3000;

//packages
const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const server = http.createServer(app);

// database connection
const connectDatabase = require("./database/connect");

// middleware
const authenticate = require("./middleware/authentication");
const errorHandlerMiddleware = require("./middleware/error-handler");

// routers
const usersRouter = require("./routers/usersRouter");
const rankingsRouter = require("./routers/rankingsRouter");
const queuesRouter = require("./routers/queuesRouter");
const questionsRouter = require("./routers/questionsRouter");
const gamesRouter = require("./routers/gamesRouter");
const authenticationRouter = require("./routers/authenticationRouter");

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/users", authenticate, usersRouter);
app.use("/rankings", authenticate, rankingsRouter);
app.use("/queues", authenticate, queuesRouter);
app.use("/questions", authenticate, questionsRouter);
app.use("/games", authenticate, gamesRouter);
app.use("/authentication", authenticationRouter);

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
