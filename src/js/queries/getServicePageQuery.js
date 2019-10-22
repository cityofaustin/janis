const getServicePageQuery = `
  query getServicePage($id: ID) {
    allServicePages(id: $id) {
      edges {
        node {
          id
          title
          relatedDepartments {
            edges {
              node {
                relatedDepartment {
                  id
                  title
                  slug
                }
              }
            }
          }
          steps
          dynamicContent
          additionalContent
          shortDescription
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
                  socialMedia
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

export default getServicePageQuery;
