import eventPageFragment from './eventPageFragment';

const getEventPageQuery = `
  query getEventPage($id: ID, $date_Lte: Date, $date_Gte: Date) {
    allEventPages(orderBy:"date", id:$id, date_Lte:$date_Lte, date_Gte:$date_Gte) {
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
