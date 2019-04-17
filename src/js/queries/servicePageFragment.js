const servicePageFragment = `
  fragment servicePageInfo on ServicePageNode {
    id
    title
    slug
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
    steps
    dynamicContent
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
`;

export default servicePageFragment;
