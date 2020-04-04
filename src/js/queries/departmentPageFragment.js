import contactFragment from './contactFragment';

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
    contact {
      ...contactInfo
    }
  }
  ${contactFragment}
`;

export default departmentPageFragment;
