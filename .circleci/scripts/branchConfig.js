/**
  For the initial site build, if you want to pull data from a joplin instance other than staging,
  plug in the CMS_API you want to use here.

  Note: subsequent publish commands from Joplin will re-override the CMS_API value.
  That means that deploys from subsequent github code pushes will pull data from whichever Joplin last triggered a publish,
  not the initial value in this file.

  Example:
  "2997-dept-links": {
    joplin_appname: "https://joplin-pr-2997-dept-links.herokuapp.com/api/graphql"
  }
  "2997-dept-links" is the name of the janis branch.
  "https://joplin-pr-2997-dept-links.herokuapp.com/api/graphql" is the address of the deployed joplin instance you want to query data from.
  That CMS_API value will only be used by the branch "2997-dept-links".
**/

/**
  Don't overwrite defaultValues, add values for your specific branch into the branchOverrides object.

  These environment variables will only be used for github deployments for staging and PRs.
  Production deployments will not gets its values from here.
  Production gets its environment variables from the Publisher only, so that nothing can be accidentally broken.
**/
const defaultValues = {
  joplin_appname: 'joplin-staging',
  // GRAPHQL_BATCH_SIZE: 10, // Only turn this on when Publisher knows how to parse it, otherwise your build request will fail
};

// Add branch-specifc values here
const branchOverrides = {
  '3690-incremental': {
    joplin_appname: 'joplin-pr-3690-incremental',
    REACT_STATIC_PREFETCH_RATE: '10',
  },
  '5084-crash': {
    joplin_appname: 'joplin',
  },
  '5094-reports': {
    joplin_appname: 'joplin',
  },
  '2021-report': {
    joplin_appname: 'joplin',
  },
};

module.exports = {
  defaultValues,
  branchOverrides,
};
