const { getCategories, getQuestions, getSessionToken, getNumQuestionsForCategory } = require(".");

describe("getCategories", () => {
  test("should return categories", async () => {
    await expect(getCategories()).resolves.toHaveProperty("trivia_categories");
  });

  test("should return 24 categories", async () => {
    const data = await getCategories();
    expect(data.trivia_categories).toHaveLength(24);
  });
});

describe("getSessionToken", () => {
  test("should return response code 0 and a success message", async () => {
    const data = await getSessionToken();
    const code = data.response_code;
    const message = data.response_message;
    expect(code).toBe(0);
    expect(message).toBe("Token Generated Successfully!");
  });
});

const completeParams = {
  numQuestions: 10,
  categoryId: 10,
  difficulty: "hard",
  type: "multiple",
};

describe("getQuestions", () => {
  test("data should contain response code 0", async () => {
    const data = await getQuestions(completeParams);
    const code = data.response_code;
    expect(code).toBe(0);
  });

  test("number of questions should match numQuestions in params", async () => {
    const data = await getQuestions(completeParams);
    const results = data.results;
    expect(results).toHaveLength(completeParams.numQuestions);
  });

  test("query should return 25 multiple-choice questions when passed no params", async () => {
    const data = await getQuestions();
    const results = data.results;
    const resultsLength = results.length;
    expect(resultsLength).toBe(25);
    expect(results[0].type).toBe("multiple");
  });

  test("category should match categoryId in params", async () => {
    const data = await getQuestions(completeParams);
    const results = data.results;
    expect(results[0].category).toBe("Entertainment: Books");
    expect(results[1].category).toBe("Entertainment: Books");
    expect(results[2].category).toBe("Entertainment: Books");
  });

  test("difficulty should match difficulty in params", async () => {
    const data = await getQuestions(completeParams);
    const results = data.results;
    expect(results[0].difficulty).toBe(completeParams.difficulty);
    expect(results[1].difficulty).toBe(completeParams.difficulty);
    expect(results[2].difficulty).toBe(completeParams.difficulty);
  });
  test("difficulty should match difficulty in params when only passed difficulty and nothing else", async () => {
    const data = await getQuestions({ difficulty: "hard" });
    const results = data.results;
    expect(results[0].difficulty).toBe({ difficulty: "hard" }.difficulty);
    expect(results[1].difficulty).toBe({ difficulty: "hard" }.difficulty);
    expect(results[2].difficulty).toBe({ difficulty: "hard" }.difficulty);
  });

  test("type should match type in params", async () => {
    const data = await getQuestions(completeParams);
    const results = data.results;
    expect(results[0].type).toBe(completeParams.type);
    expect(results[1].type).toBe(completeParams.type);
    expect(results[2].type).toBe(completeParams.type);
  });

  test("type take a token dammit", async () => {
    const tokenObj = await getSessionToken();
    const { token } = tokenObj;
    const data = await getQuestions(completeParams, token);
    const results = data.results;
    // console.log(results);
    expect(results[0].type).toBe(completeParams.type);
  });
});

describe("getNumQuestionsForCategory", () => {
  test("should return categories", async () => {
    await expect(getNumQuestionsForCategory(12)).resolves.toHaveProperty("category_question_count");
  });

  test("should return a number", async () => {
    const data = await getNumQuestionsForCategory(12);
    expect(typeof(data.category_question_count.total_question_count)).toBe('number');
  });
});
