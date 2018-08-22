const servicePageFragment = `
  fragment servicePageInfo on ServicePageNode {
    id
    title
    slug
    topic {
      id
      slug
      text
      theme {
        id
        slug
        text
      }
    }
    serviceSteps {
      edges {
        node {
          stepDescription
        }
      }
    }
    dynamicContent
    additionalContent
    related {
      slug
      title
    }
    image {
      id
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
  }
`;

export default servicePageFragment;
