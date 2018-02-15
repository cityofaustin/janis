import axios from 'axios';

export const postFeedback = (data) => {

  const { title, description, email } = data;

  return axios
    .create({
      headers: { 'Content-Type': 'application/json' }
    })
    .post(`${process.env.FEEDBACK_API}`, {
      destination: 'githubIssue',
      repository: 'alpha-public-feedback',
      title: `site-feedback-${title}`,
      description: `**Description:**\n${description}\n\n**Contact:** ${email}\n_maybe email should not be collected, or stored differently to protect privacy_`
    })
}
