require("dotenv").config;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { getLobbyInfo, getQuestion, checkIfCorrectAnswer } = require("./utils");

// server
const PORT = process.env.PORT || 5001;
const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

const sendableQuestion = (question) => {
  return {
    _id: question._id,
    text: question.text,
    answers: question.answers.map((a) => a.text),
  };
};

io.on("connection", (socket) => {
  const gameInfo = { time: 120 };

  // join game
  socket.on("join-game", async ({ playerId, lobbyId }) => {
    socket.join(lobbyId);

    // create player info
    gameInfo.player = {
      playerId: playerId,
      healthPoints: 3,
      currentQuestion: 0,
    };

    // get lobby info
    const lobby = await getLobbyInfo(lobbyId);
    gameInfo.questions = lobby.questions;

    // start game if there are 2 players
    if (io.sockets.adapter.rooms.get(lobbyId).size >= 2) {
      io.to(lobbyId).emit("start-game");

      const firstQuestion = (await getQuestion(gameInfo.questions[0])).question;
      io.to(lobbyId).emit("question-changed", sendableQuestion(firstQuestion));
      const countdown = setInterval(() => {
        io.to(lobbyId).emit("time", gameInfo.time);
        gameInfo.time--;
        if (gameInfo.time === 0) {
          clearInterval(countdown);
        }
      }, 1000);
    }

    // answer chosen
    socket.on("answer-chosen", async (info, callback) => {
      let question = (await getQuestion(info.questionId)).question;
      let result = checkIfCorrectAnswer(info, gameInfo, question);

      // send verdict to both players
      callback(result.verdict);
      socket.to(lobbyId).emit("opponent-answered", result.verdict);

      // change question
      gameInfo.player.currentQuestion++;
      if (gameInfo.player.currentQuestion < 20) {
        const curr = gameInfo.player.currentQuestion;
        const q = (await getQuestion(gameInfo.questions[curr])).question;
        socket.emit("question-changed", sendableQuestion(q));
      }

      // end game
      if (!result.verdict) {
        if (gameInfo.player.healthPoints <= 0) {
          socket.to(lobbyId).emit("game-ended", "won");
          socket.emit("game-ended", "lost");
        }
      }
    });
  });

  socket.on("dissconnect", () => {
    let playerId = gameInfo.filter((player) => player.socketId === socket.id);
    io.emit("game-ended", { playerId, verdict: false });
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
