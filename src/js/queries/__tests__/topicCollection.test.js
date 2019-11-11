import React from 'react';

import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import getTopicCollectionPageQuery from 'js/queries/getTopicCollectionPageQuery';

// do we check the length of every one? just one and hope for the best?

describe('topic collections', ()=> {
	test('Testing topic collections', async () => {
		const id = 'VG9waWNDb2xsZWN0aW9uTm9kZTo1Ng==' // id for recyling trash & compost
		// const testClient = createGraphQLClientsByLang('en', 'http://joplin-staging.herokuapp.com/api/graphql');
		// const testClient = createGraphQLClientsByLang('en', 'http://joplin.herokuapp.com/api/graphql');
		const testClient = createGraphQLClientsByLang('en', process.env.CMS_API);

		const tc = await testClient.request(getTopicCollectionPageQuery, {id: id});

		const topPages = tc.allTopicPageTopicCollections.edges[0].node.page.topPages;

		// should we check a snapshot?
		expect(topPages.edges.length).toBeGreaterThan(0);
	})
})
