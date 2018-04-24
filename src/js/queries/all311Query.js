const all311Query = `
  query all311 {
    all311 {
      edges {
        node {
          id
          title
          url
        }
      }
    }
  }`;

export default all311Query;
