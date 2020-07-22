const getOfficialDocumentsCollectionDocumentsQuery = `
  query getOfficialDocumentsCollectionDocumentsQuery($id: ID, $after: String) {
    officialDocumentCollectionDocuments(officialDocumentCollection: $id, orderBy: "-page__date", first: 25, after: $after) {
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
              url
            }
            departments {
              slug
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
