const getOfficialDocumentsCollectionDocumentsQuery = `
  query getOfficialDocumentsCollectionDocumentsQuery($id: ID) {
    officialDocumentCollectionDocuments(officialDocumentCollection: $id, orderBy: "-page__date") {
      edges {
        node {
          page {
            id
            date
            live
            slug
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
`;

export default getOfficialDocumentsCollectionDocumentsQuery;
