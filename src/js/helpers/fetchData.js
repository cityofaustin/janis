import axios from 'axios';

export const postFeedback = (data) => {

  const { title, description } = data;

  return axios
    .create({
      headers: { 'Content-Type': 'application/json' }
    })
    .post(`${process.env.FEEDBACK_API}`, {
      destination: 'githubIssue',
      repository: 'alpha-public-feedback',
      title: title,
      description: description
    })
}
