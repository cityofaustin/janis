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
  }
`;

export default getTopicCollectionPageQuery;
