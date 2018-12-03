/*
  Queries
*/
const testApiEndpoint = `{
all311 (first: 1) {
    edges {
      node {
        id,
        title,
        url
      }
    }
  }
}
`;

const allServicePagesQuery = `
  query allServicePages {
    allServicePages(live:true) {
      edges {
        node {
          id,
          slug
        }
      }
    }
  }
`;

const allProcessesQuery = `
  query allProcesses {
    allProcesses {
      edges {
        node {
          id,
          slug
        }
      }
    }
  }
`;

const allTopicsQuery = `
  query allTopicsQuery {
    allTopics{
      edges {
        node {
          id,
          slug
        }
      }
    }
  }
`;

const allThemesQuery = `
  query allThemesQuery {
    allThemes {
      edges {
        node {
          id
          slug
        }
      }
    }
  }
`;

const allDepartmentsQuery = `
  query allDepartmentsQuery {
    allDepartments {
      edges {
        node {
          id,
          slug
        }
      }
    }
  }
`;

module.exports = {
  "testApiEndpoint": testApiEndpoint,
  "allServicePagesQuery": allServicePagesQuery,
  "allProcessesQuery": allProcessesQuery,
  "allTopicsQuery": allTopicsQuery,
  "allThemesQuery": allThemesQuery,
  "allDepartmentsQuery": allDepartmentsQuery
}
