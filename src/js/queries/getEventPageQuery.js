import eventPageFragment from './eventPageFragment';

const getEventPageQuery = `
  query getEventPage($id: ID) {
    allEventPages(id: $id) {
      edges {
        node {
          ...eventPageInfo
        }
      }
    }
  }
  ${eventPageFragment}
`;

export default getEventPageQuery;
