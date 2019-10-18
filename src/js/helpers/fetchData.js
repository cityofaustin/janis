import axios from 'axios';
import { GraphQLClient } from 'graphql-request';

export const createGraphQLClientsByLang = lang => {
  const { CMS_API } = process.env;

  return new GraphQLClient(CMS_API, {
    headers: { 'Accept-Language': lang },
  });
};

export const postFeedback = data => {
  const { title, description } = data;
  // todo: make sure this also handles when in staging
  //const repository = (process.env.NODE_ENV === 'development') ? 'alpha-staging-feedback
  // : 'alpha-public-feedback';

  return axios
    .create({
      headers: { 'Content-Type': 'application/json' },
    })
    .post(`${process.env.FEEDBACK_API}`, {
      destination: 'githubIssue',
      // repository: repository,
      repository: 'alpha-public-feedback',
      title: title,
      description: description,
    });
};
