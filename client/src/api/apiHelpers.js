const validate = {
  // this is hardcoded. Stretch: pull the length of the categories array and use that to validate the categoryId
  categoryId: (id) => {
    let randomId;
    if (id < 9 || 32 < id) {
      randomId = Math.floor(Math.random() * 23) + 1;
      return randomId;
    }

    return id;
  },
};

const urlConstructor = (params) => {
  const { token, numQuestions, categoryId, difficulty, type } = params;

  let validatedCategoryId = validate.categoryId(categoryId);
  let url = `https://opentdb.com/api.php?amount=${numQuestions}`;

  if (validatedCategoryId) url += `&category=${validatedCategoryId}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (type) url += `&type=${type}`;
  if (token) url += `&token=${token}`;
  return url;
};

module.exports = { urlConstructor };
