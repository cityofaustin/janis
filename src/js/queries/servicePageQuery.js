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
      related {
        id
        slug
        title
      }
      image {
        id
        file
        title
        focalPointX
        focalPointY
        focalPointWidth
        focalPointHeight
      }
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
