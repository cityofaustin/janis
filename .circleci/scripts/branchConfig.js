/**
  For the initial site build, if you want to pull data from a joplin instance other than staging,
  plug in the CMS_API you want to use here.

  Note: publish commands from Joplin will re-override the CMS_API value.
  That means that deploys from subsequent github code pushes will pull data from whichever Joplin last triggered a publish,
  not the initial value in this file.

  Example:
  "2997-dept-links": {
    CMS_API: "https://joplin-pr-2997-dept-links.herokuapp.com/api/graphql"
  }
  "2997-dept-links" is the name of the janis branch.
  "https://joplin-pr-2997-dept-links.herokuapp.com/api/graphql" is the address of the deployed joplin instance you want to query data from.
  That CMS_API value will only be used by the branch "2997-dept-links".
**/

// Don't overwrite defaultValues.
const defaultValues = {
  CMS_API: 'https://joplin-staging.herokuapp.com/api/graphql',
  CMS_MEDIA: 'https://joplin-austin-gov-static.s3.amazonaws.com/staging/media',
  CMS_DOCS: 'multiple',
}

// Add branch-specifc values here
const branchOverrides = {
  "2997-dept-links": {
    CMS_API: "https://joplin-pr-2997-dept-links.herokuapp.com/api/graphql"
  },
  "3010-circleci": {
    CMS_API: "https://joplin-pr-3173-publish.herokuapp.com/api/graphql"
  }
}

module.exports = {
  defaultValues,
  branchOverrides
}
