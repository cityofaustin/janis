import contactFragment from './contactFragment';

const getServicePageQuery = `
  query getServicePage($id: ID) {
    allServicePages(id: $id) {
      edges {
        node {
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
      }
    }
  }
  ${contactFragment}
`;

export default getServicePageQuery;
