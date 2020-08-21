import algoliasearch from 'algoliasearch'

const algoliaClient = algoliasearch(process.env.ALGOLIA_APPLICATION_ID, process.env.ALGOLIA_API_KEY)

// Tokens, to prevent typos of strings
const JANIS_BASE_PAGE = "JANIS_BASE_PAGE"
const JANIS_BASE_PAGE_WITH_TOPICS = "JANIS_BASE_PAGE_WITH_TOPICS"
const JANIS_BASE_PAGE_WITH_TOPIC_COLLECTIONS = "JANIS_BASE_PAGE_WITH_TOPIC_COLLECTIONS"

/**
  node.pageType comes from content_type.name in Joplin.
**/
const pageTypeDefinition = {
  "location page": {
    "parent": JANIS_BASE_PAGE,
    "addExtraFields": (body, specificNode) => {
      return Object.assign(body, ({
        "physicalStreet",
        "physicalUnit",
        "physicalCity",
        "physicalState",
        "physicalZip",
      } = specificNode))
    }
  },
  "event page": {
    "parent": JANIS_BASE_PAGE,
    "addExtraFields": (body, specificNode) => {
      body = Object.assign(body, ({
        "date",
        "startTime",
        "endTime",
        "eventIsFree",
        "registrationUrl",
      } = specificNode))
      body.location = specificNode.locations[0]
      body.eventUrl = specificNode.janisUrls[0]
      if (specificNode.eventIsFree) {
        body.feesRange = ""
      } else {
        const feesRange = specificNode.fees.edges.map(f=>"$"+f.node.fee)
        body.feesRange = feesRange.join('-')
      }
      return body
    }
  },
  "department page": {
    "parent": JANIS_BASE_PAGE,
  },
  "topic collection page": {
    "parent": JANIS_BASE_PAGE,
  },
  "service page": {
    "parent": JANIS_BASE_PAGE_WITH_TOPICS,
  },
  "guide page": {
    "parent": JANIS_BASE_PAGE_WITH_TOPICS,
  },
  "information page": {
    "parent": JANIS_BASE_PAGE_WITH_TOPICS,
  },
  "official document page": {
    "parent": JANIS_BASE_PAGE_WITH_TOPICS,
    // TODO: official document pages/collections will need work
  },
  "form container": {
    "parent": JANIS_BASE_PAGE_WITH_TOPICS,
  },
  "topic page": {
    "parent": JANIS_BASE_PAGE_WITH_TOPIC_COLLECTIONS,
  }
}

/**
  Get the specificNode for a page that inherits from each parent type.
**/
const getSpecificNode = {
  [JANIS_BASE_PAGE]: (node, pageTypeFieldName) => {
    return node[pageTypeFieldName]
  },
  [JANIS_BASE_PAGE_WITH_TOPICS]: (node, pageTypeFieldName) => {
    return node["janisbasepagewithtopics"][pageTypeFieldName]
  },
  [JANIS_BASE_PAGE_WITH_TOPIC_COLLECTIONS]: (node, pageTypeFieldName) => {
    return node["janisbasepagewithtopiccollections"][pageTypeFieldName]
  }
}

/**
  Builds a new Search Index and sends it to Algolia.
  They recommend a maximum 10MB payload size per batch, we'll hit that eventually.
  https://www.algolia.com/doc/api-reference/api-methods/add-objects/
  @param {Object[]} pages - all the pages for a particular language
  @param {Object} indexMeta - metadata that allows for naming of index
  @param {string} indexMeta.branch - name of Janis branch
  @param {string} indexMeta.lang - lang code "es" or "en"
  @param {string} indexMeta.timestamp - approximate timestamp of index creation (should be same for all languages)
**/
const buildAlgoliaSearchIndex = function(pages, indexMeta) {
  const {branch, lang, timestamp} = indexMeta;
  const indexName = `${branch}___${lang}___${timestamp}`
  const batch = [];

  pages.forEach(page => {
    const {node} = page;
    const {janisUrls, pageType} = node;
    // Skip pages that don't have a janisUrl
    if (!janisUrls.length) {
      return
    }
    // Remove whitespace from pageType to get name of pageType node
    // ex: "event page" => "eventpage"
    // This is because the specificNode field name in the graphql results removes whitespace.
    const pageTypeFieldName = pageType.replace(/\s+/g,"")
    const pageTypeDefinition = pageTypeMap["pageType"]
    if (!pageTypeDefinition) {
      // Don't add this page type to the index until we have a pageTypeDefinition set.
      return
    }
    const parent = pageTypeDefinition.parent
    const specificNode = getSpecificNode[parent](node, pageTypeFieldName)

    const batchItem = {
      "action": "addObject",
      "indexName": indexName,
    }
    let body = batchItem["body"] = {
      title: specificNode.title,
      summary: specificNode.summary,
      janisUrls: janisUrls,
      pageType: pageType,
    }
    const addExtraFields = pageTypeDefinition.addExtraFields
    if (addExtraFields) {
      body = addExtraFields(body, specificNode)
    }

    // Add topics
    if (parent === JANIS_BASE_PAGE_WITH_TOPICS) {
      const {janisInstances} = node;
      if (janisInstances.length) {
        body.topics = []
        janisInstances.forEach(instance) => {
          if (instance.parent && instance.parent.title) {
            topics.push(instance.parent.title)
          }
        })
      }
    }

    batch.push(batchItem)
  })
  // TODO: https://www.algolia.com/doc/api-reference/api-methods/batch/
}

export default buildAlgoliaSearchIndex
