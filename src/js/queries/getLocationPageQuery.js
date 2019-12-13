import locationPageFragment from './locationPageFragment';

const getLocationPageQuery = `
  query getLocationPage($id: ID) {
    allLocationPages(id: $id) {
      edges {
        node {
          ...locationPageInfo
        }
      }
    }
  }
  ${locationPageFragment}
`;

export default getLocationPageQuery;



