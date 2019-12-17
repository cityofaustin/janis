const getDepartmentPageQuery = `
  query getDepartmentPage($id: ID) {
    allDepartmentPages(id: $id) {
      edges {
        node {
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
          topPages {
            edges {
              node {
                pageId
                slug
                title
              }
            }
          }
          relatedPages {
            edges {
              node {
                pageId
                slug
                title
              }
            }
          }
          contacts {
            edges {
              node {
                contact {
                  name
                  phoneNumber {
                    edges {
                      node {
                        id
                        phoneDescription
                        phoneNumber
                      }
                    }
                  }
                  email
                  socialMedia
                  locationPage {
                    id
                    title
                    physicalStreet
                    physicalUnit
                    physicalCity
                    physicalState
                    physicalCountry
                    physicalZip
                    mondayStartTime
                    mondayEndTime
                    mondayStartTime2
                    mondayEndTime2
                    tuesdayStartTime
                    tuesdayEndTime
                    tuesdayStartTime2
                    tuesdayEndTime2
                    wednesdayStartTime
                    wednesdayEndTime
                    wednesdayStartTime2
                    wednesdayEndTime2
                    thursdayStartTime
                    thursdayEndTime
                    thursdayStartTime2
                    thursdayEndTime2
                    fridayStartTime
                    fridayEndTime
                    fridayStartTime2
                    fridayEndTime2
                    saturdayStartTime
                    saturdayEndTime
                    saturdayStartTime2
                    saturdayEndTime2
                    sundayStartTime
                    sundayEndTime
                    sundayStartTime2
                    sundayEndTime2
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default getDepartmentPageQuery;
