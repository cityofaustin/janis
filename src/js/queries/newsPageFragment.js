const newsPageFragment = `
  fragment newsPageInfo on JanisBasePageNode {
    newspage {
      id
      title
      body
      contact {
        phoneNumbers {
          edges {
            node {
              phoneNumber
              phoneDescription
            }
          }
        }
        email
      }
    }
    janisInstances {
      fromDepartment {
        id
        title
        url
      }
      byDepartment {
        id
        title
        url
      }
    }
    lastPublishedAt
  }
`;

export default newsPageFragment;
