const getTopicPageQuery = `
  query getTopicPage($id: ID, $tc_id: ID) {
    allTopics(id: $id) {
      edges {
        node {
          id
          slug
          title
          description
          topPages {
            edges {
              node {
                pageId
                slug
                title
                pageType
              }
            }
          }
        }
      }
    }
    allTopicCollections(id: $tc_id) {
      edges {
        node {
          id
          slug
          title
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

export default getTopicPageQuery;

/*
  query getTopicPage($id: ID, $tc_id: ID) {
    allTopics(id: $id) {
      edges {
        node {
          id
          slug
          title
          description
          topPages {
            edges {
              node {
                pageId
                slug
                title
                pageType
              }
            }
          }
        }
      }
    }
    allTopicCollections(id: $tc_id) {
      edges {
        node {
          id
          slug
          title
          theme {
            id
            text
            slug
          }
        }
      }
    }
    allTopicPageTopicCollections(topiccollection: $tc_id) {
      edges {
        node {
          page {
            id
            slug
            title
            live
          }
        }
      }
    }
    allServicePageTopics(topic: $id) {
      edges {
        node {
          page {
            id
            slug
            title
            live
          }
        }
      }
    }
    allInformationPageTopics(topic: $id) {
      edges {
        node {
          page {
            id
            slug
            title
            live
          }
        }
      }
    }
    allGuidePageTopics(topic: $id) {
      edges {
        node {
          page {
            id
            slug
            title
            pageType
            live
          }
        }
      }
    }
    allOfficialDocumentPageTopics(topic: $id) {
      edges {
        node {
          page {
            id
            slug
            title
            live
          }
        }
      }
    }
    allFormContainerTopics(topic: $id) {
      edges {
        node {
          page {
            id
            slug
            title
            live
          }
        }
      }
    }
  }
  */


