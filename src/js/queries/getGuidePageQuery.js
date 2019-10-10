import guidePageFragment from './guidePageFragment';

const allGuidePagesQuery = `
  query getGuidePage($id: ID) {
    allGuidePages(id: $id) {
      edges {
        node {
          id
          ...guidePageInfo
        }
      }
    }
  }
  ${guidePageFragment}
`;

export default allGuidePagesQuery;
