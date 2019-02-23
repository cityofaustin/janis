const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
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
    toplink
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
