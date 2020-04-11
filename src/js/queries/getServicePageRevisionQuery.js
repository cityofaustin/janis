import servicePageFragment from './servicePageFragment';

const getServicePageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asServicePage {
        ...servicePageInfo
      }
    }
  }
  ${servicePageFragment}
`;

export default getServicePageRevisionQuery;
