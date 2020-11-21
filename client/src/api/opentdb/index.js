const axios = require("axios");
const { urlConstructor } = require("../apiHelpers.js");

// Using OpenTDB trivia database API
// Information taken from https://opentdb.com/api_config.php

module.exports = {
  // const apiCalls = {
  getCategories: async () => {
    const categories = await axios.get("https://opentdb.com/api_category.php");
    return categories.data;
  },

  // Its possible to reach the end of the questions, in which case a response
  // code will be sent, this token needs to be reset or just generated a new
  // one, it seems no benefit to reset, only going to generate new one
  getSessionToken: async function () {
    const url = "https://opentdb.com/api_token.php?command=request";
    const token = await axios.get(url);
    return token.data;
  },

  getQuestions: async function (params, token) {
    // const tokenObj = await this.getSessionToken();
    // const token = tokenObj.token;
    const url = urlConstructor(params, token);
    const questions = await axios.get(url);
    return questions.data;
  },
};
