require("dotenv").config;
const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { getLobbyInfo, getQuestion, checkIfCorrectAnswer, checkIfPlayerStillLives } = require("./utils");

// funkcja do brania informacji na temat lobby

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  // funkcja która wykona się po połączeniu,
  const gameInfo = { players: [] };

  socket.on("join-game", (gameCode) => {
    socket.join(gameCode);
    //prawdopodbnie pobierz pytania i zapisz w zmiennej

    // dodaj do aktualnego stanu gry info o graczu
    // gameInfo.players.push({healtPoints, socketId ,playerId: jakiesś id gracza z tokenu...})

    // TODO: trzeba ogarnąć jak zapisać dane dotyczące pytań. Oczywiście pozyskamy je z bazy danych,
    // ale jak je sensownie przechować na czas trwania rozgrywki by mieć do nich stały dostęp

    if (io.sockets.adapter.rooms[gameCode] >= 2) {
      io.to(gameCode).emit("start-game");

      //przykład jak można pobrać pytania:
      gameInfo.questions = getLobbyInfo(gameCode).questions;

      // + przywitaj graczy
      // + zacznij liczyć czas (to nie musi być teraz)
    }
  });

  //od klienta dostajemy event answer-chosen
  socket.on("answer-chosen", (info, gameCode) => {
    // potrzeba informacji kto odpowiedział, na które pytanie i kolejność przelosowanych odpowiedzi(według indexów 1,2,3,4) oraz odpowiedź gracza
    // info.playerId
    // info.answers
    // info.chosenAnswer

    // nastepnie ja odsyłam do wszystkich event czy jest to dobra odpowiedź czy koniec gry

    // check if player still plays
    let result = checkIfCorrectAnswer(info, gameInfo);
    if (result.verdict === false) {
      if (!checkIfPlayerStillLives(result.playerId, gameInfo)) io.to(gameCode).emit("game-ended", result);
    }

    // wysyłam do siebie że powinna nastąpić zmiana pytania
    socket.emit("question-changed", result);
    // wysyłam do przeciwnika czy odpowiedziałem dobrze
    socket.to(gameCode).emit("opponent-answered", result);
  });

  socket.on("dissconnect", () => {
    // sprawdza kto wyszedl i zwraca wynik gry
    let playerId = gameInfo.filter((player) => player.socketId === socket.id);
    io.emit("game-ended", { playerId, verdict: false }); // zwracam też verdict zeby bylo mniej walenia się z różnym obiektem niż w linijce 56
  });
});

const PORT = process.env.PORT || 5001;

app.get("/", (req, res) => res.send("something"));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
