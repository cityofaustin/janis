const getOfficialDocumentsCollectionDocumentsQuery = `
  query getOfficialDocumentsCollectionDocumentsQuery($id: ID) {
    officialDocumentCollectionDocuments(officialDocumentCollection: $id, orderBy: "-page__date") {
      edges {
        node {
          page {
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
              url
            }
          }
        }
      }
    }
  }
`;

export default getOfficialDocumentsCollectionDocumentsQuery;
