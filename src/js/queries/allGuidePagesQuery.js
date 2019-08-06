import guidePageFragment from './guidePageFragment';

const allGuidePagesQuery = `
  query allGuidePages {
    allGuidePages(live:true) {
      edges {
        node {
          ...guidePageInfo
        }
      }
    }
  }
  ${guidePageFragment}
`;

export default allGuidePagesQuery;
