require("dotenv").config;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { getLobbyInfo } = require("./utils/wrapped-http-requests");
const {
  checkIfCorrectAnswer,
  checkIfPlayerStillLives,
} = require("./utils/questions-checker");

// funkcja do brania informacji na temat lobby

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server, {
  cors: {
    origin: "http://localhost:3000"
  }
});

// io.on("connection", (socket) => {
//
//   socket.on("add-player", (playerId) => {
//     addPlayer(playerId, socket.id);
//     console.log(players);
//   })
//
//   // funkcja która wykona się po połączeniu,
//   const gameInfo = { players: [] };
//
//   socket.on("join-game", (gameCode) => {
//     socket.join(gameCode);
//     //prawdopodbnie pobierz pytania i zapisz w zmiennej
//
//     // dodaj do aktualnego stanu gry info o graczu
//     // gameInfo.players.push({healtPoints, socketId ,playerId: jakiesś id gracza z tokenu...})
//
//     // TODO: trzeba ogarnąć jak zapisać dane dotyczące pytań. Oczywiście pozyskamy je z bazy danych,
//     // ale jak je sensownie przechować na czas trwania rozgrywki by mieć do nich stały dostęp
//
//     if (io.sockets.adapter.rooms[gameCode] >= 2) {
//       io.to(gameCode).emit("start-game");
//
//       //przykład jak można pobrać pytania:
//       gameInfo.questions = getLobbyInfo(gameCode).questions;
//
//       // + przywitaj graczy
//       // + zacznij liczyć czas (to nie musi być teraz)
//     }
//   });
//
//   //od klienta dostajemy event answer-chosen
//   socket.on("answer-chosen", (info, gameCode) => {
//     // potrzeba informacji kto odpowiedział, na które pytanie i kolejność przelosowanych odpowiedzi(według indexów 1,2,3,4) oraz odpowiedź gracza
//     // info.playerId
//     // info.answers
//     // info.chosenAnswer
//
//     // nastepnie ja odsyłam do wszystkich event czy jest to dobra odpowiedź czy koniec gry
//
//     // check if player still plays
//     let result = checkIfCorrectAnswer(info, gameInfo);
//     if (result.verdict === false) {
//       if (!checkIfPlayerStillLives(result.playerId, gameInfo))
//         io.to(gameCode).emit("game-ended", result);
//     }
//
//     // wysyłam do siebie że powinna nastąpić zmiana pytania
//     socket.emit("question-changed", result);
//     // wysyłam do przeciwnika czy odpowiedziałem dobrze
//     socket.to(gameCode).emit("opponent-answered", result);
//   });
//
//   socket.on("dissconnect", () => {
//     // sprawdza kto wyszedl i zwraca wynik gry
//     let playerId = gameInfo.filter((player) => player.socketId === socket.id);
//     io.emit("game-ended", { playerId, verdict: false }); // zwracam też verdict zeby bylo mniej walenia się z różnym obiektem niż w linijce 56
//   });
//
//   socket.on('disconnect', () => {
//     removePlayer(socket.id);
//   })
// });

const games = []

const addPlayer = (gameCode, socketId, token) => {
    let game = games.find((game) => game.gameCode === gameCode)
    if (game) {
        game.players.push({
            hitPoints: 3,
            socketId: socketId,
            playerId: token,
            currentQuestion: 0
        });
    } else {
        games.push({gameCode: gameCode, players: [{
                        hitPoints: 3,
                        socketId: socketId,
                        playerId: token,
                        currentQuestion: 0
                    }
                ]
            }
        );
    }
}

const addQuestion = (gameCode, question) => {
    let game = games.find((game) => game.gameCode === gameCode)
    if (game) {
        game?.questions.push(question);
    }
}

io.on('connection', (socket) => {

    socket.on('join-game', ({token, gameCode}) => {
      socket.join(gameCode);
      addPlayer(gameCode, socket.id, token);

      if (io.sockets.adapter.rooms.get(gameCode).size >= 2) {
          let game = games.find((game) => game.gameCode === gameCode);
          game.questions = [];
          addQuestion(gameCode,{
              text: "question 1",
              answers: [
                  "answer 1",
                  "answer 2",
                  "answer 3",
                  "answer 4"
              ],
              correctAnswer: 0
          });
          addQuestion(gameCode, {
                  text: "question 2",
                  answers: [
                      "answer 1",
                      "answer 2",
                      "answer 3",
                      "answer 4"
                  ],
                  correctAnswer: 2
          });
          addQuestion(gameCode, {
                  text: "question 3",
                  answers: [
                      "answer 1",
                      "answer 2",
                      "answer 3",
                      "answer 4"
                  ],
                  correctAnswer: 1
          });
          addQuestion(gameCode,{
                  text: "question 4",
                  answers: [
                      "answer 1",
                      "answer 2",
                      "answer 3",
                      "answer 4"
                  ],
                  correctAnswer: 0
          });

          io.to(gameCode).emit('start-game', game.questions[0]);
      }
    });

    socket.on('answer-chosen', ({token, chosenAnswer, gameCode}, callback) => {
        let game = games.find((game) => game.gameCode === gameCode);
        let player = game.players.find((p) => p.playerId === token);
        let verdict = chosenAnswer === game.questions[player.currentQuestion].correctAnswer;
        console.log('question: ', player.currentQuestion, 'verdict: ', verdict);

        callback(verdict);
        socket.to(gameCode).emit('opponent-answered', verdict);

        player.currentQuestion++;
        if (player.currentQuestion < 20) {
            socket.emit('question-changed', game.questions[player.currentQuestion]);
        }

        if (verdict === false) {
            player.hitPoints--;
            if (player.hitPoints <= 0) {
                io.to(gameCode).emit('game-ended');
            }
        }
    })
});

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => res.send("something"));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
