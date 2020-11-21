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
    const url = urlConstructor(params, token);
    const questions = await axios.get(url);
    const { data } = questions;

    // if the token is invalid...do it again! Would be better if it could be recursive but I can't figure out how to call functions from within this object (this.getQuestions is not working)
    if (data.response_code === 3 || data.response_code === 4) {
      const newTokenObj = await axios.get(
        "https://opentdb.com/api_token.php?command=request"
      );
      // return this.getQuestions(params, newTokenObj.data.token);
      const newUrl = urlConstructor(params, newTokenObj.data.token);
      const newQuestions = await axios.get(newUrl);
      const newData = newQuestions.data;
      console.log("Returning from inside the 'if'");
      return newData;
    }
    console.log("Returning from outside the 'if'");
    return data;
  },
};
