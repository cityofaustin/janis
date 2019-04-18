import processPageFragment from './processPageFragment';

const allProcessesQuery = `
  query allProcesses {
    allProcesses {
      edges {
        node {
          ...processPageInfo
        }
      }
    }
  }
  ${processPageFragment}
`;

export default allProcessesQuery;
