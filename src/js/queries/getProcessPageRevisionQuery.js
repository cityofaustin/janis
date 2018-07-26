const getProcessPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      id
      asProcessPage {
        title
        description
        slug
        topic {
          slug
          text
          theme {
            slug
            text
          }
        }
        image {
          filename
          title
        }
        processSteps {
          edges {
            node {
              sortOrder
              title
              shortTitle
              linkTitle
              description
              overviewSteps
              detailedContent
              quote
              image {
                filename
                title
              }
            }
          }
        }
      }
    }
  }
`;

export default getProcessPageRevisionQuery;
