const getOfficialDocumentsCollectionDocumentsQuery = `
  query getOfficialDocumentsCollectionDocumentsQuery($id: ID, $after: String) {
    officialDocumentCollectionDocuments(officialDocumentCollection: $id, orderBy: "-page__date", first: 100, after: $after) {
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
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

export default getOfficialDocumentsCollectionDocumentsQuery;
