// removed the contactInfo fragment so there were not multiple references to contactInfo fragments in allpages
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
     name
      phoneNumbers {
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
        slug
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
        hoursExceptions
      }
    }
    news(first:3) {
      title
      firstPublishedAt
      janisbasepagePtr {
        janisUrls
      }
    }
  }
`;

export default departmentPageFragment;
