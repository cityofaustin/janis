import officialDocumentPageFragment from './officialDocumentPageFragment';

const getOfficialDocumentPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asOfficialDocumentPage {
        ...officialDocumentPageInfo
      }
    }
  }
  ${officialDocumentPageFragment}
`;

export default getOfficialDocumentPageRevisionQuery;
