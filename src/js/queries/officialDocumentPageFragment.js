const officialDocumentPageFragment = `
  fragment officialDocumentPageInfo on OfficialDocumentPageNode {
    id
    title
    slug
    description
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
    officialDocuments(orderBy: "-date") {
      edges {
        node {
          id
          date
          title
          authoringOffice
          summary
          name
          document {
            fileSize
            filename
          }
        }
      }
    }
  }
`;

export default officialDocumentPageFragment;
