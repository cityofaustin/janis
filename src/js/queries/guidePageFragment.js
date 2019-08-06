const guidePageFragment = `
  fragment guidePageInfo on GuidePageNode {
    id
    title
    description
    slug
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
    image {
      id
      filename
      title
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
    sections {
      heading
      pages {
        servicePage {
          title
          shortDescription
          additionalContent
          steps
        }
        informationPage {
          title
          description
          additionalContent
        }
      }
    }
  }
`;

export default guidePageFragment;
