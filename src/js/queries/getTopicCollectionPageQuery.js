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


    // allTopicPageTopicCollections(topiccollection: $id) {
    //   edges {
    //     node {
    //       page {
    //         id
    //         live
    //         slug
    //         title
    //         description
    //         topPages {
    //           edges {
    //             node {
    //               live
    //               title
    //               slug
    //               pageType
    //             }
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

    