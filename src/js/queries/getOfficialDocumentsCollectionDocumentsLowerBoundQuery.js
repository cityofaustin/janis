const getOfficialDocumentsCollectionDocumentsLowerBoundQuery = `
  query getOfficialDocumentsCollectionDocumentsLowerBoundQuery($id: ID) {
    officialDocumentCollectionDocuments(officialDocumentCollection: $id, orderBy: "page__date", first: 1) {
      edges {
        node {
          page {
            date
          }
        }
      }
    }
  }
`;

export default getOfficialDocumentsCollectionDocumentsLowerBoundQuery;
