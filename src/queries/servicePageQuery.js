const servicePageQuery = `
  query servicePage($pk:Int, $slug:String) {
    servicePage(pk: $pk, slug: $slug) {
      id
      title
      slug
      topic {
        id
        text
      }
      content
      extraContent
      contacts {
        edges {
          node {
            contact {
              name
              email
              phone
              hours {
                edges {
                  node {
                    dayOfWeek
                    startTime
                    endTime
                  }
                }
              }
              location {
                name
                street
                city
                state
                zip
                country
              }
            }
          }
        }
      }
    }
  }`;

export default servicePageQuery;
