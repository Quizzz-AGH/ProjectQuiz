const url = process.env.SERVER_URL || "http://localhost:5000";

const getLobbyInfo = async (gameCode) => {
    return await requestData(`${url}/lobby/${gameCode}`);
};

const getQuestion = async (questionId) => {
  return await requestData(`${url}/questions/${questionId}`);
};

const axios = require("axios");

const requestData = async (url) => {
    let data = null;
  await axios
    .get(url)
    .then((response) => {
      data = response.data
    })
    .catch((error) => {
      console.log(error);
    });
    return data;
};

module.exports = { getLobbyInfo, getQuestion };
