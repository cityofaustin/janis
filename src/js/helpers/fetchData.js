import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

export const createGraphQLClientsByLang = (lang, CMS_API) => {
  const joplinEndpoint = CMS_API || process.env.CMS_API

  return new GraphQLClient(joplinEndpoint, {
    headers: { 'Accept-Language': lang },
  });
};

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
