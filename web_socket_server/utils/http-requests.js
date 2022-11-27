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

module.exports = { requestData };
