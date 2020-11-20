
const { getCategories } = require('.');

getCategories().then(res => {
  console.log(res)
})

describe("getCategories", () => {
  test('should return categories', async () => {
    // expect(getCategories()).resolves.to.have.property('trivia_categories');
  });
});

// getSessionToken().then(res => {
//   console.log(res)
// })
