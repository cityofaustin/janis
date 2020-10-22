const getToken = `
  mutation getToken($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      payload
      token
    }
  }
`;

export default getToken;
