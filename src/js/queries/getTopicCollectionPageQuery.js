const getTopicCollectionPageQuery = `
  query getTopicCollectionPage($id: ID) {
    allTopicCollections(id: $id) {
      edges {
        node {
          id
          slug
          title
          description
          theme {
            id
            text
            slug
          }
        }
      }
    }
    allTopicPageTopicCollections(topiccollection: $id) {
      edges {
        node {
          page {
            id
            slug
            title
            description
            topPages {
              edges {
                node {
                  title
                  slug
                  pageType
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default getTopicCollectionPageQuery;
