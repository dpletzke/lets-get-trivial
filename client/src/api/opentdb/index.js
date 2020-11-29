const axios = require("axios");
const { urlConstructor } = require("../apiHelpers.js");

// Using OpenTDB trivia database API
// Information taken from https://opentdb.com/api_config.php

// const apiCalls = {
const getCategories = async () => {
  const { data } = await axios.get("https://opentdb.com/api_category.php");
  return data;
};

// const apiCalls = {
const getNumQuestionsForCategory = async (categoryId) => {
  const url = `https://opentdb.com/api_count.php?category=${categoryId}`;
  const { data } = await axios.get(url);

  return data;
};

// Its possible to reach the end of the questions, in which case a response
// code will be sent, this token needs to be reset or just generated a new
// one, it seems no benefit to reset, only going to generate new one
const getSessionToken = async function (token) {
  let url = "https://opentdb.com/api_token.php?command=";
  if (!token) {
    console.log(`Requesting a new token!`);
    url += "request";
  } else {
    console.log("Resetting token!");
    url += `reset&token=${token}`;
  }
  const { data } = await axios.get(url);
  return data;
};

const getQuestions = async (params, token) => {
  const url = urlConstructor(params, token);
  const { data } = await axios.get(url);

  // if the token is invalid...reset that thing! Would be better if it could be recursive but I can't figure out how to call functions from within this object (this.getQuestions is not working)
  if (data.response_code === 2) {
    console.log("There were not enough questions for that category.");
  }
  // no need to communicate a new token to the state here, we're
  // just reactivating the original token
  if (data.response_code === 3 || data.response_code === 4) {
    await getSessionToken(token);
    const newData = await axios.get(url);
    return newData.data;
  }
  return data;
};

module.exports = {
  getCategories,
  getSessionToken,
  getQuestions,
  getNumQuestionsForCategory,
};
