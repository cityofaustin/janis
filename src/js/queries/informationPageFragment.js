import phoneFragment from './phoneFragment';

const informationPageFragment = `
  fragment informationPageInfo on InformationPageNode {
    id
    title
    slug
    coaGlobal
    departments {
      id
      title
      slug
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
    description
    additionalContent
    contacts {
      edges {
        node {
          contact {
            name
            email
            ${phoneFragment}
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
