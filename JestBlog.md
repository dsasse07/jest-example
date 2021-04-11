# A Beginner's Guide to Unit-testing with Jest

Unit testing is an integral part of Test-Driven Development (TDD) which is the process of defining the desired actions of a function and what we expect it to do (or not do) before we begin work on the actual function. Approaching software development in this fashion serves a number of purposes:

* this process can help define a path to success by outlining the tasks that must be done over the course of the function. 
* this process can help identify edge case scenarios and ensure that your code continues to function as expected in these situations. 
* this process also ensures that as the codebase continues to grow and be modified, that changes to other parts of the codebase do not negatively effect the performance of the tested function.

Programming languages each have their own frameworks for developings unit tests. For Javascript, Jest is one of the most widely used testing frameworks, and I hope this blog serves as a beginner's guide for those looking to get started in writing their own Jest tests.

We will walk through the process of setting up basic Jest tests and the files, but you can view the repo containing all of the code [here](https://github.com/dsasse07/jest-example)


## Contents
* [Setting Up Jest](#setting-up-jest)
* [Identifying Desired Actions](#identify-desired-actions)
* [Initializing the Test File](#initializing-the-test-file)
* [Writing Tests](#writing-tests)
* [Running the Tests](#running-the-tests)
* [Writing the Functions](#writing-the-functions)
* [Conclusion](#conclusion)
* [Resources](#resources)


## Setting Up Jest 

__Steps:__
* Create a new directory, and `cd` into that directory.
* Set up the NPM environment 
```sh
mkdir jest-example && cd jest-example 
npm init -y
```
* Install Jest
```sh
npm i jest --save-dev
```
* Configure the NPM environment to use Jest by modifying the `package.json` file created earlier. This edit will cause the command `npm test` to run the tests we will be building.
```js
// In package.json
"scripts": {
  "test": "jest"
}
```

## Identify Desired Actions

To begin writing the tests, we must define what the function we will be building _should_ do, and what the _expected_ outcome should be when the function is invoked.

For our example, let's consider an object containing information about a user's blog posts:
```js
const user = {
    username: "user1",
    blogs: [
      {
        title: "Entry 1"
        likes: 130,
        content: "Blog 1 Content..."
      },
      {
        title: "Entry 2"
        likes: 100,
        content: "Blog 2 Content..."
      }
    ]
  }
```

We will be writing two functions, 
* `getTotalLikes`: to get the total number of likes that a passed in user has for all of their posts
* `getMostPopularBlog` should return the blog object of a specified user that has the most likes.

Following the TDD process, we will develop tests for these functions prior to working out the logic for the functions themselves.

## Initializing the Test File

Typically tests are written into a `tests` or `__tests__` subdirectory of the app, and we will follow this same convention. From the root of our example project, let's make a tests directory and the file which will contain our tests.
```sh
mkdir tests && cd tests && touch exampleFunctions.test.js
```
The first thing we must do in this new file is to import the functions that we will be testing (it's ok that they have not yet been written.) For the sake of this blog, we will be writing both of the sample functions into the same `.js` file, and we will use destructuring in the import to get access to both of those functions.
```js
// jest-example/tests/exampleFunctions.test.js
const { getTotalLikes, getMostPopularBlog } = require('../exampleFunctions')
```
Both of the example functions discussed above will be tested using the same sample `user` object mentioned previously, so we can define this globally for our tests file as well.
```js
// jest-example/tests/exampleFunctions.test.js
const { getTotalLikes, getMostPopularBlog } = require('../exampleFunctions')
const user = {
    username: "user1",
    blogs: [
      {
        title: "Entry 1"
        likes: 130,
        content: "Blog 1 Content..."
      },
      {
        title: "Entry 2"
        likes: 100,
        content: "Blog 2 Content..."
      }
    ]
  }
```
## Writing tests
Tests typically contain these general components. 
* a `describe` function is invoked which accepts a string (a description that will appear in the terminal when tests are run, which "describes" the test block) and a callback function which will contain the individual tests.
* One or more `test` function invocations which accepts a string describing the action of the specific test, and a callback function containing an `expect` function and a `matcher` function.
  * The `expect` function accepts the function invocation being tested, and is chained to the `matcher` which describes the expected results.

In the `getTotalLikes` function, we __expect__ that when the function is passed a user object, the return value __will be__ an integer that is the sum of the `likes` on all of the blogs of that user. Including this into our test file would look like this:
```js
  // jest-example/tests/exampleFunctions.test.js
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
```

Here, the `.toBe` matcher is used to define the expected output of the function invocation written in the preceeding `expect` statement. The `.toBe` matcher returns truthy if the output of the function is equal to the value passed into the matcher. The Jest framework has a number of defined matchers, such as:
* `toBeNull` matches only null
* `toBeUndefined` matches only undefined
* `toBeDefined` is the opposite of toBeUndefined
* `toBeTruthy` matches anything that an if statement treats as true
* `toBeFalsy` matches anything that an if statement treats as false
* `toBeGreaterThan` or `toBeLessThan` for number value comparisons
* `toMatch` accepts a Regex pattern to match a string output
* `toContain` can be used to see if a value is contained in an Array

More common Jest Matchers can be found in the official introduction [here](https://jestjs.io/docs/using-matchers) or a complete list can be foudn in the official docs [here](https://jestjs.io/docs/expect)

For our second function, we can define the expected output object within the `describe` block's scope and pass this object in to our matcher. Doing this, we will again be checking for equality, however when dealing with objects, we must use `.toEqual` instead, which iterates through all of the values of the objects to check for equality.

With this in mind, we must add this final `describe` block to our test file:

```js
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
```
## Running the Tests
The tests we have written should clearly fail because we have not yet written the functions, however we can run the test to ensure that they are properly setup.

To run the tests, run `npm test` (which matches the command we defined in the `package.json`). We are wonderfully greeted with the expected failures that our functions are not defined, and it indicates that our test file is prepared.

```js
 FAIL  tests/exampleFunctions.test.js
  getTotalLikes
    ✕ should return the total likes of a user (1 ms)
  getMostPopularBlog
    ✕ should return the most popular blog of a user

  ● getTotalLikes › should return the total likes of a user

    TypeError: getTotalLikes is not a function
```

## Writing the functions
At the root of our example project, lets make the file that will contain our functions. The name of the file should match the filename of the test file, minus the `.test` extension.

In `/jest-example`
```sh
touch exampleFunctions.js
```

In this file we need to define out two functions, and ensure that we export those functions so that our test file can access them.
```js
function getTotalLikes(user){

}
function getMostPopularBlog( user){

}
module.exports = { getTotalLikes, getMostPopularBlog }
```
If we save and run our tests again, we will see that all four tests still fail (which is expected), but Jest provides a ne message to us indicated what happened.

```js
  getTotalLikes
    ✕ should return the total likes of a user (3 ms)
  getMostPopularBlog
    ✕ should return the most popular blog of a user (1 ms)

  ● getTotalLikes › should return the total likes of a user

    expect(received).toBe(expected) // Object.is equality

    Expected: 230
    Received: undefined
```
This message indicates that our test is able to find the matching function, unlike before, but now instead of getting the expected value that was passed to the `matcher`, no value is being returned from our function. Lets implement the logic for our two functions as shown below:

```js

function getTotalLikes( user ){
  // iterate through the blog entries and sum the like values
  const totalLikes = user.blogs.reduce( (total, blog) => {
    return total += blog.likes
  }, 0)

  return totalLikes
}

function getMostPopularBlog( user ){
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
```

Now, if we run the tests one final time, we are greeted with pass indicators:
```js

 PASS  tests/exampleFunctions.test.js
  getTotalLikes
    ✓ should return the total likes of a user (1 ms)
  getMostPopularBlog
    ✓ should return the most popular blog of a user (1 ms)

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.713 s, estimated 1 s
```

## Conclusion

Testing is powerful. Even with these limited tests, we would would be able to see if changes further along in the development process negatively impact the work we have already done. For example, if the structure of the API response that we used to build the `user` object changed, running the test file would indicate an issue prior to that change going into effect. This is especially important in development teams, where multiple developers are working on the same codebase. The tests help ensure that each developer's code remains compatible and functional with each others'.

However, the reliability and power of testing is limited by the comprehensiveness of the test scenarios. As you are building tests, remember to consider the edge case scenarios that could break the function of your application, and write tests to simulate those. For example:
* What would we expect to happen if the user was not found?
* What is the expected behavior if two posts have the same number of likes?
* What is the expected behavior if a user has no blogs?

The topic of testing goes very deep, but hopefully this helps you get started with understanding the testing process and developing your own tests.

### Resources:
* [Getting Started in Jest](https://jestjs.io/docs/getting-started)
* [Common Jest Matchers](https://jestjs.io/docs/using-matchers)
* [Jest Docs](https://jestjs.io/docs/expect)
* [Jest Tutorial](https://www.valentinog.com/blog/jest/)
* [Blog Repo](https://github.com/dsasse07/jest-example)



