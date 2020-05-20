const searchIndexBuilder = function(pages) {

  const searchIndex = []

  pages.forEach( page =>{

    if (page.node.janisUrls.length > 0) {

      const janisPages = [
        "locationpage",
        "eventpage",
        "departmentpage",
        "topiccollectionpage"
      ]

      const janisBasePagesWithTopics = [
        "servicepage",
        "guidepage",
        "informationpage",
        "officialdocumentpage",
        "formcontainer"
      ]

      // Checking if the page is one of our Janis Pages without topics.
      // - If so, Add it to our search index.
      janisPages.forEach( pageType => {
        if (page.node[pageType]) {
          const searchIndexData = {
            title: page.node[pageType].title,
            janisUrls: page.node.janisUrls,
            pageType: page.node.pageType,
            summary: page.node[pageType].mission || page.node[pageType].shortDescription || ""
          }
          if (pageType === "eventpage") {
            searchIndexData.date = page.node[pageType].date
            searchIndexData.startTime = page.node[pageType].startTime
            searchIndexData.endTime = page.node[pageType].endTime
            searchIndexData.location = page.node[pageType].locations[0]
            searchIndexData.eventUrl = page.node.janisUrls[0]
            searchIndexData.eventIsFree = page.node[pageType].eventIsFree
            if (page.node[pageType].registrationUrl) {
              searchIndexData.registrationUrl = page.node[pageType].registrationUrl
            }
            if (page.node[pageType].eventIsFree) {
              searchIndexData.feesRange = ""
            } else {
              const feesRange = page.node[pageType].fees.edges.map(f=>"$"+f.node.fee)
              searchIndexData.feesRange = feesRange.join('-')
            }
          }
          if (pageType === "locationpage") {
            searchIndexData.physicalStreet = page.node[pageType].physicalStreet
            searchIndexData.physicalUnit = page.node[pageType].physicalUnit
            searchIndexData.physicalCity = page.node[pageType].physicalCity
            searchIndexData.physicalState = page.node[pageType].physicalState
            searchIndexData.physicalZip = page.node[pageType].physicalZip
          }
          searchIndex.push(searchIndexData)
        }
      })

      // And here, we're filtering out all the pages with topics into the search index.
      janisBasePagesWithTopics.forEach( pageType => {
        if (page.node.janisbasepagewithtopics && page.node.janisbasepagewithtopics[pageType]) {
          const pageToAdd = page.node.janisbasepagewithtopics[pageType]
          const searchIndexData = {
            title: pageToAdd.title,
            janisUrls: page.node.janisUrls,
            pageType: page.node.pageType,
            summary: pageToAdd.searchDescription || pageToAdd.mission || pageToAdd.shortDescription || ""
          }
          // Add topic janis instance if instances have parent.
          let topics = []
          if (page.node.janisInstances.length > 0) {
            topics = getTopics(page.node.janisInstances, pageToAdd)
            if (topics.length > 0) {
              searchIndexData.topics = topics
            }
          }
          if (pageType === "officialdocumentpage") {
            page.node.janisbasepagewithtopics[pageType].documents.edges.forEach( doc => {
              searchIndex.push({
                pageType: 'official document page document',
                title: doc.node.title,
                summary: doc.node.summary,
                date: doc.node.date,
                janisUrls: [doc.node.document.filename],
                document: [doc.node.document],
                topics: topics
              })
            })
          }
          searchIndex.push(searchIndexData)
        }
      })

      // ...finally add the Topic collection pages to the search index.
      if (page.node.janisbasepagewithtopiccollections) {
        if (page.node.janisbasepagewithtopiccollections.topicpage) {
          const pageToAdd = page.node.janisbasepagewithtopiccollections.topicpage
          searchIndex.push({
            title:  pageToAdd.title,
            janisUrls: page.node.janisUrls,
            pageType: "topic page",
            summary: pageToAdd.searchDescription || pageToAdd.mission || pageToAdd.shortDescription || ""
          })
        }
      }

    }

  })

  return searchIndex

}

const getTopics = function(instances, pageToAdd) {
  const instanceIndex = []
  instances.forEach( instance => {
    if (instance.parent && instance.parent.title) {
      instanceIndex.push(instance.parent.title)
    }
  })
  return instanceIndex
}



export default searchIndexBuilder
