const url = process.env.SERVER_URL || "http://localhost:5000";

const getLobbyInfo = (gameCode) => {
  return requestData(`${url}/lobby/${gameCode}`);
};

getQuestion = (questionId) => {
  return requestData(`${url}/questions/${questionId}`);
};

const axios = require("axios");

const requestData = async (url) => {
  axios
    .get(url)
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { getLobbyInfo, getQuestion };
