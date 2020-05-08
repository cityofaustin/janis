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
          searchIndex.push({
            title: page.node[pageType].title,
            janisUrls: page.node.janisUrls,
            pageType: pageType,
            summery: page.node[pageType].mission || page.node[pageType].shortDescription || ""
          })
        }
      })

      // And here, we're filting out all the pages with topics into the search index.
      janisBasePagesWithTopics.forEach( pageType => {
        if (page.node.janisbasepagewithtopics && page.node.janisbasepagewithtopics[pageType]) {
          const pageToAdd = page.node.janisbasepagewithtopics[pageType]
          searchIndex.push({
            title: pageToAdd.title,
            janisUrls: page.node.janisUrls,
            pageType: pageType,
            summery: pageToAdd.searchDescription || pageToAdd.mission || pageToAdd.shortDescription || ""
          })
        }
      })

      // ...finally add the Topic collection pages to the search index.
      if (page.node.janisbasepagewithtopiccollections) {
        if (page.node.janisbasepagewithtopiccollections.topicpage) {
          const pageToAdd = page.node.janisbasepagewithtopiccollections.topicpage
          searchIndex.push({
            title:  pageToAdd.title,
            janisUrls: page.node.janisUrls,
            pageType: "topicpage",
            summery: pageToAdd.searchDescription || pageToAdd.mission || pageToAdd.shortDescription || ""
          })
        }
      }

    }

  })

  return searchIndex

}



export default searchIndexBuilder
