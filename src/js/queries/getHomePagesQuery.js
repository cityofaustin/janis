const getHomePagesQuery = `
  query {
    allHomePages {
      edges {
        node {
          topPages {
            edges {
              node {
                id
                title
                slug
                live
                coaGlobal
                departments {
                  id
                  title
                  slug
                }
              }
            }
          }
        }
      }
    }
  }
`

export default getHomePagesQuery
