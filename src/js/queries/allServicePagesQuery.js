const allServicePagesQuery = `
  query allServicePages {
    allServicePages {
      id
      title
      slug
      topic {
        id
        slug
        text
        theme {
          id
          slug
          text
        }
        servicePages {
          id
          slug
          title
        }
      }
      steps
      dynamicContent
      additionalContent
      image {
        id
        filename
        title
      }
      contacts {
        name
        email
        phone
        hours {
          dayOfWeek
          startTime
          endTime
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
`;

export default allServicePagesQuery;
