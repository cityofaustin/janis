const getOfficialDocumentPageQuery = `
  query getOfficialDocumentPage($id: ID) {
    allOfficialDocumentPages(id: $id) {
      edges {
        node {
          id
          title
          slug
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
      }
    }
  }
`;

export default getOfficialDocumentPageQuery;
