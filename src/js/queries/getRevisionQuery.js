const getRevisionQuery = `
  query allRevisions($id:ID!) {
    allPageRevisions(id:$id) {
      edges {
        node {
          contentJson
        }
      }
    }
  }
`;

export default getRevisionQuery;
