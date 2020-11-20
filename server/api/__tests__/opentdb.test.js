const expect = require('chai').expect;

const { getCategories, getSessionToken } = require('../opentdb/index');

getCategories().then(res => {
  console.log(res)
})

describe('getCategories',  ()  => {
  it('should return categories', async () => {
    const response = await getCategories();
    expect(response).to.have.property('trivia_categories');
  });
})

// getSessionToken().then(res => {
//   console.log(res)
// })
