import conciseContactFragment from './conciseContactFragment';

const servicePageFragment = `
  fragment servicePageInfo on ServicePageNode {
    id
    title
    departments {
      id
      title
      slug
    }
    steps
    dynamicContent
    additionalContent
    shortDescription
    contacts {
      edges {
        node {
          contact {
            ...contactInfo
          }
        }
      }
    }
  }
  ${conciseContactFragment}
`;

export default servicePageFragment;
