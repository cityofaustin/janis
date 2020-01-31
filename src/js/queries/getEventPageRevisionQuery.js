import eventPageFragment from './eventPageFragment';

const getEventPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asEventPage {
        ...eventPageInfo
      }
    }
  }
  ${eventPageFragment}
`;

export default getEventPageRevisionQuery;
