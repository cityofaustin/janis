const allTopicsQuery = `
  query allTopicsQuery {
    allTopics{
      edges {
        node {
          id,
          slug,
          title,
          description,
          topiccollections {
            edges {
              node {
                topiccollection {
                  id
                  title
                  slug
                  theme {
                    id
                    slug
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

export default allTopicsQuery;
