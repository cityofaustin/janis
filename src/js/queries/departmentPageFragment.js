import phoneFragment from './phoneFragment';

const departmentPageFragment = `
  fragment departmentPageInfo on DepartmentPageNode {
    id
    slug
    title
    whatWeDo
    image {
      id
      filename
      title
    }
    mission
    departmentDirectors {
      edges {
        node {
          name
          photo {
            id
            filename
          }
          about
          title
        }
      }
    }
    jobListings
    topServices
    contacts {
      edges {
        node {
          contact {
            name
            phone
            ${phoneFragment}
            email
            socialMedia
            location {
              id
              name
              street
              city
              state
              country
              zip
            }
            hours {
              edges {
                node {
                  dayOfWeek
                  startTime
                  endTime
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default departmentPageFragment;
