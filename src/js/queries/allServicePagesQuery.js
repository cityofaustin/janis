const allServicePagesQuery = `
  query allServicePages {
    allServicePages {
      edges {
        node {
          id
          title
          slug
          topic {
            id
            text
          }
          steps
          dynamicContent
          additionalContent
          related {
            id
            slug
            title
          }
          image {
            id
            file
            title
          }
          contacts {
            edges {
              node {
                contact {
                  name
                  email
                  phone
                  hours {
                    edges {
                      node {
                        dayOfWeek
                        startTime
                        endTime
                      }
                    }
                  }
                  location {
                    name
                    street
                    city
                    state
                    zip
                    country
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`

export default allServicePagesQuery;
