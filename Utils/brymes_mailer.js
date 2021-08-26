var axios = require("axios");

async function sendMail(config) {
  var resp, respE;
  config["method"] = "POST";
  config["url"] = "https://brymes-mailer.herokuapp.com/send";
  config["headers"] = {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJmcmVzaCI6dHJ1ZSwiaWF0IjoxNjIyNDUwNDY5LCJqdGkiOiI4MDA3M2NiMS0xOGM1LTQ0NzUtYmRmZi1hOWNkMDM4ZTE2OWEiLCJuYmYiOjE2MjI0NTA0NjksInR5cGUiOiJhY2Nlc3MiLCJzdWIiOiJzYWxvbmV5LnNhbG9uQGdtYWlsLmNvbSIsImV4cCI6MTcwODc2NDA2OX0.xDZsKz50fweCwfcpx6KFeixxkVWDRoE2t7fdfaW7Q1s", //FIXME
    "Content-Type": "application/json"
  };

  await axios(config)
    .then(async function (response) {
      resp = response;
    })
    .catch(function (error) {
      console.log(error.toJSON());
      respE = error;
      if (respE.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.log("Brymes Mailer error response");
        console.log(respE.response.data);
        console.log(respE.response.status);
        console.log(respE.response.headers);
        console.log("Config", respE.config);
        console.log("END Of Brymes Mailer error response");

        return respE.response;
      } else if (respE.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log("Brymes Mailer No response Received");
        console.log(respE.request);
        console.log("Config", respE.config);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.log("Brymes Mailer error from Saloney");
        console.log("Error", respE.message);
        console.log("Config", respE.config);
      }
    });

  return resp;
}

module.exports = {
  sendMail: sendMail
};
