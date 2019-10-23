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

  return axios
    .create({
      headers: { 'Content-Type': 'application/json' },
    })
    .post(`${process.env.FEEDBACK_API}`, {
      destination: 'githubIssue',
      repository: 'alpha-public-feedback',
      title: title,
      description: description,
    });
};
