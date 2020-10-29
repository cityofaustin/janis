/* 👀
  These two helper functions are meant to manage hash(‘#’) query urls that we've now used
  on multiple pages in multiple ways. As of writing this we have
  both search (represented as '?') and 'page' for pagination page number.

  They were clashing when navigating the site where different pages needed the
  hash in different ways. So, here is a centralized way to manage them.

  The queryObjectBuilder() function takes the hash and converts it into
  a javascript object.
  - Example: alpha.austin.gov/search#?=office&page=3
    - the function plucks out `?=office&page=3` and converts and returns
      {
        '?': office,
        'page': 3
      }

  The queryStringBuilder() does the opposite.
  It takes an object and converts it to a query string.
  - Example:
      {
        '?': 'police',
        page: 2,
        filter: 'service'
      }
  - Converts to: alpha.austin.gov/search#?=police&page=2&filter=service

  Note: This will not be limited to just search and page. Any new key=value(s)
  can be added.
*/


export function queryObjectBuilder() {
  const queryObject = {}

  if (typeof window !== 'undefined') {
    const query = decodeURIComponent(window.location.hash.split("?")[1])
    if (query !== 'undefined') {
      const querySplit = query.split('&')
      querySplit.forEach( keyValue => {
        const keyValueArray = keyValue.split('=')
        if (!isNaN(keyValueArray[1]) && keyValueArray[1] !== "") {
          queryObject[keyValueArray[0]] = parseInt(keyValueArray[1])
        } else if (keyValueArray[1] !== "undefined" && keyValueArray[1]) {
          queryObject[keyValueArray[0]] = keyValueArray[1]
        }
      })
    }
  }

  return queryObject
}


export function queryStringBuilder(queryObject) {
  let queryKeys = Object.keys(queryObject)
  let queryString = ''

  if (queryKeys.length > 0) {

    if (queryObject['?']) {
      queryString = queryObject['?'] !== "" ? `?=${queryObject['?']}` : ""
      const queryIndex = queryKeys.indexOf('?')
      queryKeys.splice(queryIndex, queryIndex + 1)
    } else {
      queryString = `${queryKeys[0]}=${queryObject[queryKeys[0]]}`
      queryKeys.shift()
    }

    if (queryKeys.length > 0) {
      queryKeys.forEach( (key) => {
        if (queryObject[key] !== "") {
          queryString += `&`
          queryString += `${key}=${queryObject[key]}`
        }
      })
    }

  }

  return queryString

}


/* Urls for test cases: ✔️

- blanks and stowaways
http://localhost:3000/search ✔️
http://localhost:3000/search# ✔️
http://localhost:3000/search#? ✔️
http://localhost:3000/search#?=fi& ✔️
http://localhost:3000/search#?=fi&page=3& ✔️

- with search
http://localhost:3000/search#?=fi ✔️
http://localhost:3000/search#?=fi&page=3 ✔️
http://localhost:3000/search#?=fi&page=3&filter=service&department=opp ✔️

- no search
http://localhost:3000/search#page=3&filter=service&department=opp ✔️
http://localhost:3000/search#&page=3&filter=service&department=opp ✔️

*/
