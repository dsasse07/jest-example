
function getTotalLikes( userArray, username ){
  // find the correct user
  const user = userArray.find( user => {
    return user.username === username
  })

  // iterate through the blog entries and sum the like values
  const totalLikes = user.blogs.reduce( (total, blog) => {
    return total += blog.likes
  }, 0)

  return totalLikes
}

function getMostPopularBlog( userArray, username ){
  // find the correct user
  const user = userArray.find( user => {
    return user.username === username
  })
  // Iterate through users blogs, and update the tracking object to
  // continually have the index of the blog with most likes, and the 
  // number of likes for comparison
  const maxLikes = user.blogs.reduce( (max, blog, index) => {
      if (blog.likes > max.likes) {
        return {
          index: index, 
          likes: blog.likes
        }
      } else {
        return max
      }
  }, {index: undefined, likes: 0} )

  //Select get the blog object by looking up the index stored in the tracker
  const topBlog = user.blogs[ maxLikes.index ]
  return topBlog
}

module.exports = { getTotalLikes, getMostPopularBlog }