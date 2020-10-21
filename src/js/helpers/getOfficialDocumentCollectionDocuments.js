import filesize from 'filesize';
import getOfficialDocumentsCollectionDocumentsQuery from 'js/queries/getOfficialDocumentsCollectionDocumentsQuery';
import getOfficialDocumentsCollectionDocumentsLowerBoundQuery from 'js/queries/getOfficialDocumentsCollectionDocumentsLowerBoundQuery';
import { createDateFromString } from 'js/helpers/date';

// Get all Documents for an OfficialDocumentCollection
export const getOfficialDocumentCollectionDocuments = async (officialDocumentCollectionId, client) => {
  let officialDocumentCollectionDocuments = []
  let after = '';
  while (true) {
    const res = await client.request(
      getOfficialDocumentsCollectionDocumentsQuery,
      {
        id: officialDocumentCollectionId,
        after: after,
      },
    );
    officialDocumentCollectionDocuments = officialDocumentCollectionDocuments.concat(res.officialDocumentCollectionDocuments.edges)
    after = res.officialDocumentCollectionDocuments.pageInfo.endCursor;
    if (!res.officialDocumentCollectionDocuments.pageInfo.hasNextPage) {
      break;
    }
  }

  let documentArray = [];

  if (
    officialDocumentCollectionDocuments.length
  ) {
    for (let doc of officialDocumentCollectionDocuments) {
      // If we have a document in wagtail
      // use that info to update the information syncronously
      if (doc.node.page.live && doc.node.page.document) { // if the page is draft form, do not add
        doc.node.page.link = doc.node.page.document.url;
        // If it's a pdf, add the size
        if (doc.node.page.document.filename.slice(-3) === 'pdf') {
          doc.node.page.pdfSize = filesize(doc.node.page.document.fileSize).replace(
            ' ',
            '',
          );
        }
        documentArray.push(doc.node.page);
      }
    }
  }

  return documentArray
}

/**
  For the sake of our Filter's DayPicker,
  return the date of the earliest OfficialDocument for a Collection.
  It would not be necessary for users to choose a date earlier than the earliest date.
  @returns lowerBound {DateString} "YYYY-MM-DD"
**/
export const getOfficialDocumentCollectionLowerBound = async (officialDocumentCollectionId, client) => {
  const res = await client.request(
    getOfficialDocumentsCollectionDocumentsLowerBoundQuery,
    {
      id: officialDocumentCollectionId,
    },
  );
  const result = res.officialDocumentCollectionDocuments.edges
  if (!result.length) {
    // In case there are no documents on a Collection, default to 2018 as the lowerBound.
    return new Date(2018,0,1)
  }
  return result[0].node.page.date
}
