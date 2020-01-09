import conciseContactFragment from './conciseContactFragment';

const servicePageFragment = `
  fragment servicePageInfo on ServicePageNode {
    id
    title
    relatedDepartments {
      edges {
        node {
          relatedDepartment {
            id
            title
            slug
          }
        }
      }
    }
    steps {
      value
      stepType
      locations {
        locationPage {
          id
          slug
          title
          physicalStreet
          physicalUnit
          physicalCity
          physicalState
          physicalZip
        }
      }
    }
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
