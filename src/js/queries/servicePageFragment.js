import phoneFragment from './phoneFragment';

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
                      text
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
            ${phoneFragment}
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
