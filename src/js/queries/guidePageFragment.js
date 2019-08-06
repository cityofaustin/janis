const guidePageFragment = `
  fragment guidePageInfo on GuidePageNode {
    id
    title
    description
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
