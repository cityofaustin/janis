const getOfficialDocumentPageQuery = `
  query getOfficialDocumentPage($id: ID) {
    allOfficialDocumentPages(id: $id) {
      edges {
        node {
          id
          title
          slug
          description
          departments {
            id
            title
            slug
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

                // document {
                //   fileSize
                //   filename
                // }