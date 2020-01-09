import servicePageFragment from './servicePageFragment';

const getServicePageQuery = `
  query getServicePage($id: ID) {
    allServicePages(id: $id) {
      edges {
        node {
          ...servicePageInfo
        }
      }
    }
  }
  ${servicePageFragment}
`;

export default getServicePageQuery;
