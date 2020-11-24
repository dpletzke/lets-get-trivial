const validate = {
  // this is hardcoded. Stretch: pull the length of the categories array and use that to validate the categoryId
  categoryId: (id) => {
    if (id < 9 || 32 < id) {
      return null;
    }
    return id;
  },
  numQuestions: (num) => {
    if (!num) {
      return 25;
    }
    return num;
  },
  type: (type) => {
    if (!type) {
      return "multiple";
    }
    return type;
  },
};

const urlConstructor = (params, token) => {
  const parameters = params ? params : {};
  const { numQuestions, categoryId, difficulty, type } = parameters;

  let validatedCategoryId = validate.categoryId(categoryId);
  let validatedNumQuestions = validate.numQuestions(numQuestions);
  let validatedType = validate.type(type);
  let url = `https://opentdb.com/api.php?amount=${validatedNumQuestions}`;

  if (validatedCategoryId) url += `&category=${validatedCategoryId}`;
  if (difficulty) url += `&difficulty=${difficulty}`;
  if (validatedType) url += `&type=${validatedType}`;
  if (token) url += `&token=${token}`;

  return url;
};

module.exports = { urlConstructor };
