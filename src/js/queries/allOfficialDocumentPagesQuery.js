import officialDocumentPageFragment from './officialDocumentPageFragment';

const allOfficialDocumentPagesQuery = `
  query allOfficialDocumentPages {
    allOfficialDocumentPages(live:true){
      edges {
        node {
          ...officialDocumentPageInfo
        }
      }
    }
  }
  ${officialDocumentPageFragment}
`;

export default allOfficialDocumentPagesQuery;
