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
            filename
            title
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
          jobListings,
          contacts {
            edges {
              node {
                contact {
                  name,
                  phone,
                  email,
                  socialMedia,
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
