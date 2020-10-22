import servicePageFragment from './servicePageFragment';
import departmentPageFragment from './departmentPageFragment';
import eventPageFragment from './eventPageFragment';
import formContainerFragment from './formContainerFragment';
import guidePageFragment from './guidePageFragment';
import informationPageFragment from './informationPageFragment';
import locationPageFragment from './locationPageFragment';
import officialDocumentPageFragment from './officialDocumentPageFragment';
import topicCollectionFragment from './topicCollectionFragment';
import topicFragment from './topicFragment';
import newsPageFragment from './newsPageFragment';

// todo in the distant future:
// * figure out duplicate fragment issues
// * get this working
// export default const getPageRevisionQuery = `
//   query getPageRevision($id: ID) {
//     pageRevision(id: $id) {
//       asServicePage {
//         ...servicePageInfo
//       }
//       asDepartmentPage {
//         ...departmentPageInfo
//       }
//       asEventPage {
//         ...eventPageInfo
//       }
//       asFormContainer {
//         ...formContainerInfo
//       }
//       asGuidePage {
//         ...guidePageInfo
//       }
//       asInformationPage {
//         ...informationPageInfo
//       }
//       asLocationPage {
//         ...locationPageInfo
//       }
//       asOfficialDocumentPage {
//         ...officialDocumentPageInfo
//       }
//       asTopicCollectionPage {
//         ...topicCollectionInfo
//       }
//       asTopicPage {
//         ...topicInfo
//       }
//       previewJanisInstance {
//         url
//         parent {
//           url
//           title
//         }
//         grandparent {
//           url
//           title
//         }
//       }
//     }
//   }
//   ${servicePageFragment}
//   ${departmentPageFragment}
//   ${eventPageFragment}
//   ${formContainerFragment}
//   ${guidePageFragment}
//   ${informationPageFragment}
//   ${locationPageFragment}
//   ${officialDocumentPageFragment}
//   ${topicCollectionFragment}
//   ${topicFragment}
// `;

const janisInstanceFragment = `
  fragment janisInstanceInfo on ContextualNavData {
    url
    parent {
      url
      title
    }
    grandparent {
      url
      title
    }
    fromDepartment {
      title
      url
    }
    byDepartment {
      title
      url
    }
  }
`;

export const getServicePageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asServicePage {
        ...servicePageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${servicePageFragment}
  ${janisInstanceFragment}
`;

export const getOfficialDocumentsPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asOfficialDocumentPage {
        ...officialDocumentPageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${officialDocumentPageFragment}
  ${janisInstanceFragment}
`;

export const getDepartmentPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asDepartmentPage {
        ...departmentPageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${departmentPageFragment}
  ${janisInstanceFragment}
`;

export const getEventPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asEventPage {
        ...eventPageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${eventPageFragment}
  ${janisInstanceFragment}
`;

export const getLocationPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asLocationPage {
        ...locationPageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${locationPageFragment}
  ${janisInstanceFragment}
`;

export const getInformationPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asInformationPage {
        ...informationPageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${informationPageFragment}
  ${janisInstanceFragment}
`;

export const getTopicPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asTopicPage {
        ...topicInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${topicFragment}
  ${janisInstanceFragment}
`;

export const getTopicCollectionRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asTopicCollectionPage {
        ...topicCollectionInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${topicCollectionFragment}
  ${janisInstanceFragment}
`;

export const getGuidePageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asGuidePage {
        ...guidePageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${guidePageFragment}
  ${janisInstanceFragment}
`;

export const getFormPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asFormContainer {
        ...formContainerInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${formContainerFragment}
  ${janisInstanceFragment}
`;

export const getNewsPageRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asNewsPage {
        ...newsPageInfo
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${newsPageFragment}
  ${janisInstanceFragment}
`;

export const getOfficialDocumentsCollectionRevisionQuery = `
  query getPageRevision($id: ID) {
    pageRevision(id: $id) {
      asOfficialDocumentCollection {
        id
        title
        documentsCount
        slug
        description
        departments {
          id
          title
          slug
        }
      }
      previewJanisInstance {
        ...janisInstanceInfo
      }
    }
  }
  ${janisInstanceFragment}
`;

export const getPageRevisionQuery = {
  services: getServicePageRevisionQuery,
  department: getDepartmentPageRevisionQuery,
  event: getEventPageRevisionQuery,
  location: getLocationPageRevisionQuery,
  information: getInformationPageRevisionQuery,
  topic: getTopicPageRevisionQuery,
  topiccollection: getTopicCollectionRevisionQuery,
  guide: getGuidePageRevisionQuery,
  form: getFormPageRevisionQuery,
  news: getNewsPageRevisionQuery,
  official_document_collection: getOfficialDocumentsCollectionRevisionQuery,
  official_document_page: getOfficialDocumentsPageRevisionQuery,
};

export const getAsPage = {
  services: 'asServicePage',
  department: 'asDepartmentPage',
  event: 'asEventPage',
  location: 'asLocationPage',
  information: 'asInformationPage',
  topic: 'asTopicPage',
  topiccollection: 'asTopicCollectionPage',
  guide: 'asGuidePage',
  form: 'asFormContainer',
  news: 'asNewsPage',
  official_document_collection: 'asOfficialDocumentCollection',
  official_document_page: 'asOfficialDocumentPage',
};
