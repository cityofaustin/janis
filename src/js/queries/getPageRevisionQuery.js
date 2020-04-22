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

export const getPageRevisionQuery = {
  services: getServicePageRevisionQuery,
  official_document: getOfficialDocumentsPageRevisionQuery,
  department: getDepartmentPageRevisionQuery,
  event: getEventPageRevisionQuery,
  location: getLocationPageRevisionQuery,
  information: getInformationPageRevisionQuery,
  topic: getTopicPageRevisionQuery,
  topiccollection: getTopicCollectionRevisionQuery,
};

export const getAsPage = {
  services: 'asServicePage',
  official_document: 'asOfficialDocumentPage',
  department: 'asDepartmentPage',
  event: 'asEventPage',
  location: 'asLocationPage',
  information: 'asInformationPage',
  topic: 'asTopicPage',
  topiccollection: 'asTopicCollectionPage'
};
