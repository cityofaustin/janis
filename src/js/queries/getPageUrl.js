const getPageUrlQuery = `
  query getPageUrl($id: ID) {
    allPages(id:$id) {
      edges {
        node {
          janisInstances {
            url
            parent {
              url
            }
            grandparent {
              url
            }
          }
        }
      }
    }
  }
`;

export default getPageUrlQuery;
