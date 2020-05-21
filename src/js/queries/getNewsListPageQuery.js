const getNewsListPageQuery = `
  query($departmentPageId:ID){
    allPages(id:$departmentPageId) {
      edges {
        node {
          departmentpage {
            news {
              title
            }
          }
        }
      }
    }
  }
`;

export default getNewsListPageQuery;
