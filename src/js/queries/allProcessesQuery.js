const allProcessesQuery = `
  query allProcesses {
    allProcesses {
      edges {
        node {
          title
          description
          slug
          department {
            id
          }
          topics {
            edges {
              node {
                topic {
                  id,
                  slug,
                  title,
                  description,
                  topiccollections {
                    edges {
                      node {
                        topiccollection {
                          id
                          title
                          slug
                          theme {
                            id
                            slug
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          image {
            filename
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
          processSteps {
            edges {
              node {
                sortOrder
                title
                shortTitle
                linkTitle
                description
                overviewSteps
                detailedContent
                quote
                image {
                  filename
                  title
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default allProcessesQuery;
