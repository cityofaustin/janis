export function queryObjectBuilder() {
  if (typeof window !== 'undefined') {
    const query = decodeURIComponent(window.location.hash.split("#")[1]).split('&')
    const queryObject = {}
    query.map( keyValue => {
      const keyValueArray = keyValue.split('=')
      queryObject[keyValueArray[0]] = keyValueArray[1]
    })
    return queryObject
  }
}
