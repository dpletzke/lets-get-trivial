const { getCategories, getCategoryId } = require(".");

describe("getCategories", () => {
  test("should return categories", async () => {
    await expect(getCategories()).resolves.toHaveProperty("trivia_categories");
  });

  test("should return 24 categories", async () => {
    const data = await getCategories();
    expect(data.trivia_categories).toHaveLength(24);
  });
});

describe("getCategoryId", () => {
  test("should return categories", async () => {
    await expect(getCategoryId("adventure")).resolves.toHaveProperty(
      "trivia_categories"
    );
  });
});
