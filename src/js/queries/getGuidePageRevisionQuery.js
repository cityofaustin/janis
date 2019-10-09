import guidePageFragment from './guidePageFragment';

const getGuidePageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asGuidePage {
        ...guidePageInfo
      }
    }
  }
  ${guidePageFragment}
`;

export default getGuidePageRevisionQuery;
