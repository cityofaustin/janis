/**
  For the initial site build, if you want to pull data from a joplin instance other than staging,
  plug in the CMS_API you want to use here.

  Note: publish commands from Joplin will re-override the CMS_API value.
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

// Don't overwrite defaultValues.
const defaultValues = {
  joplin_appname: 'joplin-staging',
  REACT_STATIC_PREFETCH_RATE: '0', // Don't do prefetching by default
};

// Add branch-specifc values here
const branchOverrides = {
  '3690-incremental': {
    joplin_appname: 'joplin-pr-3690-incremental',
    REACT_STATIC_PREFETCH_RATE: '10',
  },
  '4289-page-guide': {
    joplin_appname: 'joplin-pr-v3',
  },
  '4611-gzip': {
    joplin_appname: 'joplin'
  },
  'banner-image': {
    joplin_appname: 'joplin'
  },
  '4872-link-doc-summary': {
    joplin_appname: 'joplin-pr-4872-link-summary',
  },
  '4776-elastic': {
    joplin_appname: 'joplin-pr-4776-elastic'
  },
};

module.exports = {
  defaultValues,
  branchOverrides,
};
