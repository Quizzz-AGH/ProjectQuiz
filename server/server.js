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

// middleware functions
const errorHandlerMiddleware = require("./middleware/errorHandler");
const notFound = require("./middleware/notFound");

app.use(express.json());
app.use(cors());
app.use(cookieParser(process.env.JWT_SECRET));

// routers
const usersRouter = require("./routers/usersRouter");
const rankingsRouter = require("./routers/rankingsRouter");
const lobbyRouter = require("./routers/lobbyRouter");
const questionsRouter = require("./routers/questionsRouter");
const historyRouter = require("./routers/historyRouter");
const authenticationRouter = require("./routers/authenticationRouter");

app.use("/users", usersRouter);
app.use("/rankings", rankingsRouter);
app.use("/lobby", lobbyRouter);
app.use("/questions", questionsRouter);
app.use("/history", historyRouter);
app.use("/authentication", authenticationRouter);

app.use(errorHandlerMiddleware);
app.use(notFound);

app.get("/", (req, res) => {
  res.send("test");
});

// start server callback function
// this is the function that starts the server
const start = async () => {
  try {
    await connectDatabase(process.env.MONGO_URI);
    server.listen(port, console.log(`server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

// start the server
start();
