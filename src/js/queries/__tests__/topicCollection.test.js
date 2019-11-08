import React from 'react';

import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import getTopicCollectionPageQuery from 'js/queries/getTopicCollectionPageQuery';

// do we check the length of every one? just one and hope for the best?

describe('get the shape of a tc', ()=> {
	test('test test', async () => {
		console.log(process.env.CMS_API)
		const id = 'VG9waWNDb2xsZWN0aW9uTm9kZTo1Ng==' // id for recyling trash & compost
		const testClient = createGraphQLClientsByLang('en', 'http://joplin-staging.herokuapp.com/api/graphql');
		const tc = await testClient.request(getTopicCollectionPageQuery, {id: id});

		const topPages = tc.allTopicPageTopicCollections.edges[0].node.page.topPages;
		expect(topPages.edges.length).toBeGreaterThan(0);
	})
})