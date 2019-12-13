import locationPageFragment from './locationPageFragment';

const getLocationPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asLocationPage {
        ...locationPageInfo
      }
    }
  }
  ${locationPageFragment}
`;

export default getLocationPageRevisionQuery;
