require("dotenv").config;
const path = require("path");
const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

io.on("connection", (socket) => {
  // funkcja która wykona się po połączeniu,

  socket.on("join-game", (gameCode) => {
    socket.join(gameCode);
    //prawdopodbnie pobierz pytania i zapisz w zmiennej

    // TODO: trzeba ogarnąć jak zapisać dane dotyczące pytań. Oczywiście pozyskamy je z bazy danych,
    // ale jak je sensownie przechować na czas trwania rozgrywki by mieć do nich stały dostęp

    if (io.sockets.adapter.rooms[gameCode] >= 2) {
      io.to(gameCode).emit("start-game");
      // + przywitaj graczy
      // + zacznij liczyć czas (to nie musi być teraz)
    }
  });

  //od klienta dostajemy event answer-chosen
  socket.on("answer-chosen", (info, gameCode) => {
    // potrzeba informacji kto odpowiedział, na które pytanie i kolejność przelosowanych odpowiedzi(według indexów 1,2,3,4) oraz odpowiedź gracza
    // info.playerId
    // info.answers
    // info.chosen answer

    // nastepnie ja odsyłam do wszystkich event czy jest to dobra odpowiedź czy koniec gry

    // check if player still plays
    io.to(gameCode).emit("game-ended", result);

    // wysyłam do siebie że powinna nastąpić zmiana pytania
    socket.emit("question-changed", result);
    // wysyłam do przeciwnika czy odpowiedziałem dobrze
    socket.to(gameCode).emit("opponent-answered", result);
  });

  socket.on("dissconnect", () => {
    // sprawdza kto wyszedl i zwraca wynik gry
    io.emit("game-ended", result);
  });
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => res.send("something"));

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
