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
            searchIndexData.startTime = page.node[pageType].endTime
            searchIndexData.locations = page.node[pageType].locations.filter( l => l.cityLocation && l.cityLocation.title )
            if (page.node[pageType].registrationUrl) {
              searchIndexData.registrationUrl = page.node[pageType].registrationUrl
            }
            if (page.node[pageType].eventIsFree) {
              searchIndexData.fees = "eventIsFree"
            } else {
              searchIndexData.fees = page.node[pageType].fees
            }
          }
          if (pageType === "locationpage") {
            console.log("locationpage :", page.node[pageType])
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
          if (page.node.janisInstances.length > 0) {
            const topics = getTopics(page.node.janisInstances, pageToAdd)
            if (topics.length > 0) {
              searchIndexData.topics = topics
            }
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
