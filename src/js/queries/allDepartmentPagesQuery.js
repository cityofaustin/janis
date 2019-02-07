const allDepartmentPagesQuery = `
  query allDepartmentPagesQuery($id:ID) {
    allDepartmentPages(id: $id) {
      edges {
        node {
          id,
          slug,
          title,
          whatWeDo,
          image {
            id
          },
          mission,
          departmentDirectors {
            edges {
              node {
                name
                photo {
                  id
                  filename
                }
                about
                email
                phone
              }
            }
          },
          socialMedia,
          jobListings,
          contacts {
            edges {
              node {
                contact {
                  name,
                  phone,
                  location {
                    id,
                    name,
                    street,
                    city,
                    state,
                    country,
                    zip
                  },
                  hours {
                    edges {
                      node {
                        dayOfWeek,
                        startTime,
                        endTime
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }`;

export default allDepartmentPagesQuery;
