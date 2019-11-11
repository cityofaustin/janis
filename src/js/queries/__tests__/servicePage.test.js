import React from 'react';

import { createGraphQLClientsByLang } from 'js/helpers/fetchData';
import getServicePageQuery from 'js/queries/getServicePageQuery';

// do we check the length of every one? just one and hope for the best?

describe('Service Pages', ()=> {
	test('Testing service pages', async () => {
		// const testClient = createGraphQLClientsByLang('en', 'http://joplin-staging.herokuapp.com/api/graphql');
		// const testClient = createGraphQLClientsByLang('en', 'http://joplin.herokuapp.com/api/graphql');
		const testClient = createGraphQLClientsByLang('en', process.env.CMS_API);

		const service = await testClient.request(getServicePageQuery);
		const allServicePages = service.allServicePages.edges;

		expect(allServicePages.length).toBeGreaterThan(0);
	})
})