const { defaults } = require("../config/settings");

const validate = {

  categoryId: (id) => {
    if (id < 9 || 32 < id) {
      return null;
    }
    return id;
  },
  numQuestions: (num) => {
    if (!num) {
      return defaults.numQuestions;
    }
    return num;
  },
  type: (type) => {
    if (!type) {
      return "multiple";
    }
    return type;
  },
  difficulty: (difficulty) => {
    if (difficulty && difficulty !== "Mixed") {
      return difficulty.toLowerCase();
    } else {
      return null;
    }
  },
};

const urlConstructor = (params, token) => {
  const parameters = params ? params : {};
  const { numQuestions, categoryId, difficulty, type } = parameters;

  let validatedCategoryId = validate.categoryId(categoryId);
  let validatedNumQuestions = validate.numQuestions(numQuestions);
  let validatedType = validate.type(type);
  let validatedDifficulty = validate.difficulty(difficulty);
  let url = `https://opentdb.com/api.php?amount=${validatedNumQuestions}`;

  if (validatedCategoryId) url += `&category=${validatedCategoryId}`;
  if (validatedDifficulty) url += `&difficulty=${validatedDifficulty}`;
  if (validatedType) url += `&type=${validatedType}`;
  if (token) url += `&token=${token}`;

  return url;
};

module.exports = { urlConstructor };
