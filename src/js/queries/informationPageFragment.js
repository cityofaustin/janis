const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
    id
    title
    slug
    department {
      id
    }
    topics {
      edges {
        node {
          topic {
            id
            slug
            title
            theme {
              id
              slug
              text
            }
          }
        }
      }
    }
    description
    options
    additionalContent
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

export default informationPageFragment;
