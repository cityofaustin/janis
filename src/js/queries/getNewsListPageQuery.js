const getNewsListPageQuery = `
  query($departmentPageId:ID){
    allPages(id:$departmentPageId) {
      edges {
        node {
          departmentpage {
            janisbasepagePtr {
              janisUrls
            }
            title
            news {
              title
              firstPublishedAt
              janisbasepagePtr {
                janisUrls
              }
            }
          }
        }
      }
    }
  }
`;

export default getNewsListPageQuery;
