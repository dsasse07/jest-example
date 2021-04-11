const { getTotalLikes, getMostPopularBlog } = require('../exampleFunctions')
const user = {
    username: "user1",
    blogs: [
      {
        title: "Entry 1",
        likes: 130,
        content: "Blog 1 Content..."
      },
      {
        title: "Entry 2",
        likes: 100,
        content: "Blog 2 Content..."
      }
    ]
  }


describe('getTotalLikes', () => {
  test('should return the total likes of a user', () => {
    expect( getTotalLikes(user) ).toBe(230)
  })
})

describe('getMostPopularBlog', () => {
  test('should return the most popular blog of a user', () => {
    const output = {
        title: "Entry 1",
        likes: 130,
        content: "Blog 1 Content..."
    }
    expect( getMostPopularBlog(user) ).toEqual(output)
  })
})

