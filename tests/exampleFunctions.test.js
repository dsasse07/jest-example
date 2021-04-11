const { getTotalLikes, getMostPopularBlog } = require('../exampleFunctions')
const users = [
  {
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
  },
  {
    username: "user2",
    blogs: [
      {
        title: "Entry 1",
        likes: 33,
        content: "Blog 1 Content..."
      },
      {
        title: "Entry 2",
        likes: 80,
        content: "Blog 2 Content..."
      }
    ]
  }
]

describe('getTotalLikes', () => {
  test('should return the total likes of a a specified user (user1)', () => {
    expect( getTotalLikes(users, "user1") ).toBe(230)
  })
  test('should return the total likes of a a specified user (user2)', () => {
    expect( getTotalLikes(users, "user2") ).toBe(113)
  })  
})

describe('getMostPopularBlog', () => {
  test('should return the most popular blog of user1', () => {
    const output = {
        title: "Entry 1",
        likes: 130,
        content: "Blog 1 Content..."
    }
    expect( getMostPopularBlog(users, "user1") ).toEqual(output)
  })
  test('should return the most popular blog of user1', () => {
    const output = {
      title: "Entry 2",
      likes: 80,
      content: "Blog 2 Content..."
    }
    expect( getMostPopularBlog(users, "user2") ).toEqual(output)
  })
})

