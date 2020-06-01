export function queryObjectBuilder() {
  const queryObject = {}

  if (typeof window !== 'undefined') {
    const query = decodeURIComponent(window.location.hash.split("#")[1])
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
