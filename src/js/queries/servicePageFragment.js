const servicePageFragment = `
  fragment servicePageInfo on ServicePageNode {
    id
    title
    slug
    department {
      id
    }
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
    steps
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
