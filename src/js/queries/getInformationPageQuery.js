const getInformationPageQuery = `
  query getInformationPage($id: ID) {
    allInformationPages(id: $id) {
      edges {
        node {
          id
          title
          slug
          coaGlobal
          departments {
            id
            title
            slug
          }
          description
          options
          additionalContent
          contacts {
            edges {
              node {
                contact {
                  name
                  email
                  phoneNumber {
                    edges {
                      node {
                        id
                        phoneDescription
                        phoneNumber
                      }
                    }
                  }
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
`;

export default getInformationPageQuery;
