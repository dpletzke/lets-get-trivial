const axios = require("axios");

// Using OpenTDB trivia database API
// Information taken from https://opentdb.com/api_config.php

module.exports = {
  getCategories: async () => {
    const categories = await axios.get("https://opentdb.com/api_category.php");
    return categories.data;
  },

  getCategoryId: async (id) => {
    const categories = await this.getCategories();
    return categories.data;
  },

  // Its possible to reach the end of the questions, in which case a response
  // code will be sent, this token needs to be reset or just generated a new
  // one, it seems no benefit to reset, only going to generate new one
  getSessionToken: async () => {
    const url = "https://opentdb.com/api_token.php?command=request";
    return await axios.get(url).data;
  },

  // getQuestions: async (params) => {
  //   const { token, numQuestions, categoryId, difficulty, type } = params;

  //   if(categoryId < 9 || 32 < categoryId) {
  //     throw console.error('Invalid category! defaulting to any category')
  //   };

  //   const url = `https://opentdb.com/api.php?amount=${numQuestions}`
  //   if(categoryId) url += `&category=${categoryId}`;
  //   if(difficulty) &difficulty=easy&type=multiple`

  //   const categories = await axios.get('https://opentdb.com/api_category.php');
  //   return categories.data.trivia_categories
  // }
};
