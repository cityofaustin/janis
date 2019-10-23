const axios = require('axios');

const { defaultValues, branchOverrides } = require("./branchConfig.js")
const branch = process.env.CIRCLE_BRANCH;
const payload = Object.assign(
  {
    "janis_branch": branch,
  },
  defaultValues,
  branchOverrides[branch]);

return axios.post(`${process.env.CI_COA_PUBLISHER_URL}/build`, payload)
.then((res) => {
  console.log("Success")
  console.log("New build instructions sent to coa-publisher")
  console.log("Check github or netlify for status updates")
  process.exit(0)
})
.catch((error) => {
  console.log("Failure")
  console.error(error)
  process.exit(1)
})
