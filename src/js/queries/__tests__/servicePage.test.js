import React from 'react';

import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import getServicePageQuery from 'js/queries/getServicePageQuery';

// do we check the length of every one? just one and hope for the best?

describe('Service Pages', ()=> {
	test('Testing service pages', async () => {
		console.log('*** - process.env.CMS_API: ', process.env.CMS_API) // coming up as undefined.
		// const testClient = createGraphQLClientsByLang('en', 'http://joplin-staging.herokuapp.com/api/graphql');
		// const testClient = createGraphQLClientsByLang('en', 'http://joplin.herokuapp.com/api/graphql');
		const testClient = createGraphQLClientsByLang('en', process.env.CMS_API);

		const service = await testClient.request(getServicePageQuery);
		console.log(service);

		//const topPages = tc.allTopicPageTopicCollections.edges[0].node.page.topPages;
		// could we check a snapshot?
		//expect(topPages.edges.length).toBeGreaterThan(0);
	})
})