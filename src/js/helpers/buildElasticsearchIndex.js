const { Client } = require('@elastic/elasticsearch')

const elasticClient = new Client({
  node: 'http://localhost:9200'
})
// const algoliaClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY)

// Tokens, to prevent typos of strings
const JANIS_BASE_PAGE = "janisbasepage"
const JANIS_BASE_PAGE_WITH_TOPICS = "janisbasepagewithtopics"
const JANIS_BASE_PAGE_WITH_TOPIC_COLLECTIONS = "janisbasepagewithtopiccollections"

/**
  node.pageType comes from content_type.name in Joplin.
**/
const pageTypeDefinitions = {
  "location page": {
    "addExtraFields": (doc, node, specificNode) => {
      const fieldsToAdd = [
        "physicalStreet",
        "physicalUnit",
        "physicalCity",
        "physicalState",
        "physicalZip",
      ]
      fieldsToAdd.forEach(field => {
        doc[field] = specificNode[field]
      })
      return doc
    }
  },
  "event page": {
    "addExtraFields": (doc, node, specificNode) => {
      const fieldsToAdd = [
        "date",
        "startTime",
        "endTime",
        "eventIsFree",
        "registrationUrl",
      ]
      fieldsToAdd.forEach(field => {
        doc[field] = specificNode[field]
      })
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
  "department page": {
  },
  "topic collection page": {
  },
  "service page": {
  },
  "guide page": {
  },
  "information page": {
  },
  "official document page": {
    // TODO: official document pages/collections will need work
  },
}

/**
  Get the pageType-specifc data for a page.
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
  Builds a new Search Index and sends it to Algolia.
  They recommend a maximum 10MB payload size per batch, we'll hit that eventually.
  https://www.algolia.com/doc/api-reference/api-methods/add-objects/
  @param {Object[]} pages - all the pages for a particular language
  @param {Object} indexName - name of the index: `${branch}___${lang}___${timestamp}`
    [name of Janis branch] +
    [lang code "es" or "en"] +
    [approximate timestamp of index creation (should be same for all languages)]
**/
const buildElasticsearchIndex = async function(pages, indexName) {
  const body = [];
  console.log(`Starting to build index ${indexName}`)

  pages.forEach(page => {
    // console.log("a page?", page)
    const {node} = page;
    const {janisUrls, pageType, parentClass} = node;
    // Skip pages that don't have a janisUrl
    if (!janisUrls.length) {
      return
    }
    // Remove whitespace from pageType to get name of pageType node
    // ex: "event page" => "eventpage"
    // This is because the specificNode field name in the graphql results removes whitespace.
    const pageTypeFieldName = pageType.replace(/\s+/g,"")
    const pageTypeDefinition = pageTypeDefinitions[pageType]
    if (!pageTypeDefinition) {
      // Don't add this page type to the index until we have a pageTypeDefinition set.
      return
    }
    const specificNode = getSpecificNode(node, pageTypeFieldName)

    let doc = {
      title: specificNode.title,
      summary: specificNode.searchSummary,
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

    // elasticsearch api body needs 1 entry for the index operation,
    // followed by the doc that will be run by that operation.
    body.push({
      "index": {
        "_index": indexName,
        "_id": node.pageId,
      }
    })
    body.push(doc)
  })

  // Taken from https://www.elastic.co/guide/en/elasticsearch/client/javascript-api/current/bulk_examples.html
  try {
    const { body: bulkResponse } = await elasticClient.bulk({
      refresh: true,
      body: body,
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

export default buildElasticsearchIndex
