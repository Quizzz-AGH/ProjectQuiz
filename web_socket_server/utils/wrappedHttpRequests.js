const axios = require("axios");
const url = process.env.SERVER_URL || "http://localhost:5000";

// This function allows us to get the lobby info from the API server
const getLobbyInfo = async (gameCode) => {
  return await requestData(`${url}/lobby/${gameCode}`);
};

// This function allows us to get the question from the API server
const getQuestion = async (questionId) => {
  return await requestData(`${url}/questions/${questionId}`);
};

// This function allows us to make a request to the API server
const requestData = async (url) => {
  let data = null;
  await axios
    .get(url)
    .then((response) => {
      data = response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
};

module.exports = { getLobbyInfo, getQuestion };
