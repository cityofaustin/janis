const getOfficialDocumentsCollectionDocumentsQuery = `
  query getOfficialDocumentsCollectionDocumentsQuery($id: ID) {
    officialDocumentCollectionDocuments(officialDocumentCollection: $id) {
      edges {
        node {
          documentPages(orderBy: "-date") {
            edges {
              node {
                id
                date
                live
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

export default getOfficialDocumentsCollectionDocumentsQuery;

    