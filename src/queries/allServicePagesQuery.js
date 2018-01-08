const allServicePagesQuery = `
  query allServicePages {
    allServicePages {
      edges {
        node {
          id
          title
          slug
        }
      }
    }
  }`;

export default allServicePagesQuery;
