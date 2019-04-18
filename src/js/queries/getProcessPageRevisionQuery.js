import processPageFragment from './processPageFragment';

const getProcessPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asProcessPage {
        ...processPageInfo
      }
    }
  }
  ${processPageFragment}
`;

export default getProcessPageRevisionQuery;
