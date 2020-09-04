import axios from 'axios';
import { request, GraphQLClient } from 'graphql-request';
import getToken from 'js/mutations/getToken.js'

export const createGraphQLClientsByLang = async (lang, CMS_API) => {
  const joplinEndpoint = CMS_API || process.env.CMS_API

  // const variables = {email: process.env.EMAIL, password: process.env.PASSWORD}
  const variables = {email: 'admin@austintexas.io', password: 'x'}

  return request(joplinEndpoint, getToken, variables).then(data => {
    return new GraphQLClient(joplinEndpoint, {
      headers: { 'Accept-Language': lang, 'Authorization': `JWT ${data.tokenAuth.token}` },
    });
  })
};

export const createPreviewGraphQLClientsByLang = (lang, CMS_PREVIEW_API) => {
  const joplinPreviewEndpoint = CMS_PREVIEW_API || process.env.CMS_PREVIEW_API
  return new GraphQLClient(joplinPreviewEndpoint, {
    headers: {'Accept-Language': lang }
  })
}


export const postFeedback = data => {
  const { title, description } = data;
  const repository = (process.env.DEPLOYMENT_MODE === 'PRODUCTION') ? 'alpha-public-feedback'
   : 'alpha-staging-feedback';

  return axios
    .create({
      headers: { 'Content-Type': 'application/json' },
    })
    .post('https://coa-test-form-api.herokuapp.com/process/', {
      destination: 'githubIssue',
      repository: repository,
      title: title,
      description: description,
    });
};
