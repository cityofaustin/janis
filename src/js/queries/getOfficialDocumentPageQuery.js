import officialDocumentPageFragment from './officialDocumentPageFragment';

const getOfficialDocumentPageQuery = `
  query getOfficialDocumentPage($id: ID) {
    allOfficialDocumentPages(id: $id) {
      edges {
        node {
          id
          ...officialDocumentPageInfo
        }
      }
    }
  }  ${officialDocumentPageFragment}
`;

export default getOfficialDocumentPageQuery;
