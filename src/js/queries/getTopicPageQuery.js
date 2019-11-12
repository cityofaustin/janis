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
          }
        }
      }
    }
    allFormPageTopics(topic: $id) {
      edges {
        node {
          page {
            id
            slug
            title
          }
        }
      }
    }
  }
`;

export default getTopicPageQuery;
