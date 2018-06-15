const allThemesQuery = `
  query allThemesQuery {
    allThemes {
      id
      slug
      text
      description
      topics {
        text
        slug
        description
        servicePages(first: 4) {
          id
          title
          slug
        }
      }
    }
  }
`;

export default allThemesQuery;
