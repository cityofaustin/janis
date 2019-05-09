import processPageFragment from './processPageFragment';

const allProcessesQuery = `
  query allProcesses {
    allProcesses(live:true) {
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
