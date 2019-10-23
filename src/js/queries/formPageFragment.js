const formPageFragment = `
  fragment formPageInfo on FormPageNode {
    id
    title
    slug
    description
    scriptTag
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
  }
`;

export default formPageFragment;
