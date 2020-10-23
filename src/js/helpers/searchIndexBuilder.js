const { Client } = require('@elastic/elasticsearch')

/**
  ### How searchIndexBuilder works:

  Each page in our searchIndex is called a "doc", per elasticsearch's terminology.
  Every "doc" will have at least these fields: "title", "searchSummary", "janisUrls", and "pageType".

  If a pageType needs more fields than these,
  then they can be added to the "addExtraFields" function within the pageTypesToIndex object.

  If you're using elasticsearch, then the searchIndex will be sent to the elasticsearch server.
  If you're not using elasticsearch, then the searchIndex array will be returned
  so that it can be embedded into the Search page directly.

  ### How to add a new pageType to the index:
  Add it to the pageTypesToIndex object.
  If there are extra fields to add, then add an optional "addExtraFields" function.
  The data that goes into the "searchSummary" field is specified by the contentType model's search_summary property within Joplin.
**/

// Tokens, to prevent typos of strings
const JANIS_BASE_PAGE = "janisbasepage"
const JANIS_BASE_PAGE_WITH_TOPICS = "janisbasepagewithtopics"
const JANIS_BASE_PAGE_WITH_TOPIC_COLLECTIONS = "janisbasepagewithtopiccollections"

/**
  Adds fields from specificNode to a searchIndex "doc".
**/
const addFieldsToDoc = (doc, specificNode, fieldsToAdd) => {
  fieldsToAdd.forEach(field => {
    doc[field] = specificNode[field]
  })
  return doc
}

/**
  Object contains all the page types we want to add to our index.
  If a page type is not included in this object, it will not be indexed.
  Include optional "addExtraFields" function if we need to add extra fields for a specific pageType.
  node.pageType comes from content_type.name in Joplin.
**/
const pageTypesToIndex = {
  "location page": {
    "addExtraFields": (doc, node, specificNode) => {
      doc = addFieldsToDoc(doc, specificNode, [
        "physicalStreet",
        "physicalUnit",
        "physicalCity",
        "physicalState",
        "physicalZip",
      ])
      return doc
    }
  },
  "event page": {
    "addExtraFields": (doc, node, specificNode) => {
      doc = addFieldsToDoc(doc, specificNode, [
        "date",
        "startTime",
        "endTime",
        "eventIsFree",
        "registrationUrl",
      ])
      doc.location = specificNode.locations[0]
      doc.eventUrl = node.janisUrls[0]
      if (specificNode.eventIsFree) {
        doc.feesRange = ""
      } else {
        const feesRange = specificNode.fees.edges.map(f=>"$"+f.node.fee)
        doc.feesRange = feesRange.join('-')
      }
      return doc
    }
  },
  "department page": {},
  "topic collection page": {},
  "service page": {},
  "guide page": {},
  "information page": {},
  "official document page": {
    "addExtraFields": (doc, node, specificNode) => {
      doc = addFieldsToDoc(doc, specificNode, [
        "authoringOffice",
        "document",
        "body",
      ])
      doc.partOf = specificNode.officialDocumentCollection.edges[0].node.officialDocumentCollection
      return doc
    }
  },
  "official document collection": {},
  "form container": {},
}

/**
  Get the pageType-specifc data for a page.
  The graphql results for a page are nested under different keys depending on the pageType.

  Example for pageTypeFieldName === "officialdocumentpage":
  {
    "node": {
      "janisbasepagewithtopics": null,
      "janisbasepagewithtopiccollections": null,
      "newspage": null,
      "officialdocumentpage": {
        "title": "Formal Complaint"
      }
    }
  }

  Example for pageTypeFieldName === "servicepage":
  {
    "node": {
      "janisbasepagewithtopics": {
        "servicepage": {
          "title": "Adopt a Pet"
        }
      },
      "janisbasepagewithtopiccollections": null,
      "newspage": null,
      "officialdocumentpage": null
    }
  }
  @param {Object[]} node - full graphql node for a page
  @param {Object[]} pageTypeFieldName - pagetype without whitespace ("event page" => "eventpage")
**/
const getSpecificNode = (node, pageTypeFieldName) => {
  const {parentClass} = node
  // Content types that inherit directly from janisbasepage
  // are nested under their pageTypeFieldName.
  if (parentClass === JANIS_BASE_PAGE) {
    return node[pageTypeFieldName]
  } else {
    // Pages that have other parentClasses (like "janisbasepagewithtopics")
    // have their specific data nested under the parentClass name.
    return node[parentClass][pageTypeFieldName]
  }
}

/**
  Builds a new Search Index.
  @param {Object[]} pages - all the pages for a particular language
  @param {Object} indexName - name of the index: `${branch}___${lang}___${timestamp}`
    [name of Janis branch] +
    [lang code "es" or "en"] +
    [approximate timestamp of index creation (should be same for all languages)]
  @param (Boolean) USE_ELASTICSEARCH - If true, then send output of search index to elasticSearch.
    Otherwise, the search index is embeded into the search page for manual search.
  @returns {Object[]} searchIndex or {null} - if not USE_ELASTICSEARCH, then return the searchIndex.
    Otherwise
**/
const searchIndexBuilder = async function(pages, indexName="", USE_ELASTICSEARCH=false) {
  const searchIndex = [];

  if (indexName && USE_ELASTICSEARCH) {
    console.log(`Starting to build index ${indexName}`)
  }

  pages.forEach(page => {
    // console.log("a page?", page)
    const {node} = page;
    const {janisUrls, pageType, parentClass, searchSummary} = node;
    // Skip pages that don't have a janisUrl
    if (!janisUrls.length) {
      return
    }

    const pageTypeDefinition = pageTypesToIndex[pageType]
    // Remove whitespace from pageType to get name of pageType node
    // ex: "event page" => "eventpage"
    // This is because the specificNode field name in the graphql results removes whitespace.
    const pageTypeFieldName = pageType.replace(/\s+/g,"")
    if (!pageTypeDefinition) {
      // Don't add this page type to the index until we have a pageTypeDefinition set.
      return
    }
    const specificNode = getSpecificNode(node, pageTypeFieldName)

    let doc = {
      title: specificNode.title,
      searchSummary: searchSummary,
      janisUrls: janisUrls,
      pageType: pageType,
    }
    const addExtraFields = pageTypeDefinition.addExtraFields
    if (addExtraFields) {
      doc = addExtraFields(doc, node, specificNode)
    }

    // Add topics
    if (parentClass === JANIS_BASE_PAGE_WITH_TOPICS) {
      const {janisInstances} = node;
      if (janisInstances.length) {
        doc.topics = []
        janisInstances.forEach(instance => {
          if (instance.parent && instance.parent.title) {
            doc.topics.push(instance.parent.title)
          }
        })
      }
    }

    if (USE_ELASTICSEARCH) {
      /**
        If we're sending the searchIndex to elasticsearch, then you must add an "index" operation object
        before the actual document that is run by that operation.
        That's how the API works, I'm sorry.

        searchIndex with elastic search looks like this:
        [{index}, {doc}, {index}, {doc}, ...]

        searchIndex WITHOUT elasticsearch looks like this:
        [{doc}, {doc}, {doc}, {doc}, ...]
      **/
      searchIndex.push({
        "index": {
          "_index": indexName,
          "_id": node.pageId,
        }
      })
    }
    searchIndex.push(doc)
  })

  if (USE_ELASTICSEARCH) {
    await sendIndexToElasticSeach(searchIndex)
  } else {
    // If we're not sending the index to elasticsearch, then we're going to return it
    // so that it can be embedded directly into the search page.
    return searchIndex
  }
}

/**
  Sends searchIndex to elasticSearch server.
  @param {Object[]} searchIndex - All of the operations + documents to add to elasticsearch index.
**/
const sendIndexToElasticSeach = async (searchIndex) => {
  const elasticClient = new Client({
    node: process.env.ELASTICSEARCH_URL
  })

  // Taken from https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/bulk_examples.html
  try {
    const { body: bulkResponse } = await elasticClient.bulk({
      refresh: true,
      body: searchIndex,
     })
    if (bulkResponse.errors) {
      const erroredDocuments = []
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          })
        }
      })
      console.log(`There were errors building index ${indexName}`)
      console.log(erroredDocuments)
    } else {
      console.log(`Successfully built index ${indexName}`)
    }
  } catch (err) {
    console.log(`There were catastophic errors building index ${indexName}`)
    console.log(err)
    throw err
  }
}

export default searchIndexBuilder
