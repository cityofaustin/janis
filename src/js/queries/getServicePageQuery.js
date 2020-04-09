import conciseContactFragment from './conciseContactFragment';

const getServicePageQuery = `
  query getServicePage($id: ID) {
    allServicePages(id: $id) {
      edges {
        node {
          id
          title
          coaGlobal
          departments {
            id
            title
            slug
          }
          steps
          dynamicContent
          additionalContent
          shortDescription
          contact {
            ...contactInfo
          }
        }
      }
    }
  }
  ${conciseContactFragment}
`;

export default getServicePageQuery;
