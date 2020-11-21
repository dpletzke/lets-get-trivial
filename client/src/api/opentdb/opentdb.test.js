const { getCategories, getQuestions } = require(".");

describe("getCategories", () => {
  test("should return categories", async () => {
    await expect(getCategories()).resolves.toHaveProperty("trivia_categories");
  });

  test("should return 24 categories", async () => {
    const data = await getCategories();
    expect(data.trivia_categories).toHaveLength(24);
  });
});

const completeParams = {
  numQuestions: 10,
  categoryId: 2,
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
  test("category should match categoryId in params", async () => {
    const data = await getQuestions(completeParams);
    const results = data.results;
    console.log(results);
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

  test("type should match type in params", async () => {
    const data = await getQuestions(completeParams);
    const results = data.results;
    expect(results[0].type).toBe(completeParams.type);
    expect(results[1].type).toBe(completeParams.type);
    expect(results[2].type).toBe(completeParams.type);
  });
});
