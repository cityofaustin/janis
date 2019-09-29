import officialDocumentPageFragment from './officialDocumentPageFragment';

const globalOfficialDocumentPagesQuery = `
  query allOfficialDocumentPages {
    allOfficialDocumentPages(live:true, coaGlobal: true) {
      edges {
        node {
          ...officialDocumentPageInfo
          coaGlobal
        }
      }
    }
  }
  ${officialDocumentPageFragment}
`;

export default globalOfficialDocumentPagesQuery;
