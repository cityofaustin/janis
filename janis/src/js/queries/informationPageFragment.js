const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
    id
    title
    slug
    department {
      id
      slug
      title
    }
    topics {
      edges {
        node {
          toplink
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
    description
    options
    additionalContent
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
