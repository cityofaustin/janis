import guidePageFragment from './guidePageFragment';

const globalGuidePagesQuery = `
  query allGuidePages {
    allGuidePages(live: true, coaGlobal: true) {
      edges {
        node {
          ...guidePageInfo
          coaGlobal
        }
      }
    }
  }
  ${guidePageFragment}
`;

export default globalGuidePagesQuery;
