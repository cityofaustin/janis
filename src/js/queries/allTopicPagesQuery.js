const allTopicPagesQuery = `
  query allTopicPagesQuery {
    allTopics {
      id
      slug
      text
      description
      callToAction
      servicePages {
        id
        title
        slug
      }
      theme {
        text
        slug
      }
    }
  }
`;

export default allTopicPagesQuery;
