const { requestData } = require("./http-requests");

const getLobbyInfo = (gameCode) =>
  requestData(`http://localhost:5000/queues/${gameCode}`);
