const topServicesQuery = `
  query topServices {
    allServicePages(first: 4) {
      edges {
        node {
          id
          title
          slug
          topic {
            id
            text
          }
        }
      }
    }
  }
`

export default topServicesQuery;
