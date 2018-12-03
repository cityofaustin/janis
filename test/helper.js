const Promise = require('bluebird');
const http = require('http');
const request = require('request-promise');


const SUPPORTED_LANG_CODES = ['en', 'es', 'vi', 'ar'];

const allQueries = require('./queries');

const joplin_application_name = process.env.APPLICATION_NAME;
const joplin_endpoint = process.env.CMS_API;
const deployment_mode = process.env.DEPLOYMENT_MODE;
const joplin_bucket = process.env.AWS_S3_BUCKET;
let janis_url = process.env.APPLICATION_URL;

if(deployment_mode === "PREVIEW") {
  janis_url += "/" + joplin_application_name;
}


const joplinTest = {

  queries: {
    'allServicePages': {
      "query": allQueries.allServicePagesQuery,
      "slug": "services"
    },
    'allProcesses': {
      "query": allQueries.allProcessesQuery,
      "slug": "processes"
    },
    'allTopicsQuery': {
      "query": allQueries.allTopicsQuery,
      "slug": "topics"
    },
    'allDepartmentsQuery': {
      "query": allQueries.allDepartmentsQuery,
      "slug": "departments"
    }
  },

  routes: null,


  getJanisURL: () => {
    return janis_url
  },

  getLanguages: () => {
    return SUPPORTED_LANG_CODES;
  },

  getEndpointURL: (uri) => {
    return joplin_endpoint + uri;
  },

  httpGet: (url) => request({
    uri: url,
    method: "GET",
    resolveWithFullResponse: true
  }),

  gqlQuery: (joplinQuery) => {
    return request({
      method: 'POST',
      uri: joplin_endpoint,
      body: {
          query: joplinQuery
      },
      json: true
    });

  },

  /*
    Returns the slug given a query.
  */

  getUriFromQuery: (query) => {
    let q = query.match(/query (.+)(\(.+\))?{/g)[0] || "";
    q = q.substring(6, q.indexOf('{')-1).trim();
    return joplinTest.queries[q]["slug"] || "";
  },

  /*
    Gathers the 'slug' using a graphiql query,
    Returns an array with all the slugs found in the API.
  */

  getSlugs: async (query) => {
    let routes = [];
    let resp = await joplinTest.gqlQuery(query);
    let isDepts = joplinTest.getUriFromQuery(query) === "departments";
    resp.data[Object.keys(resp.data)[0]].edges.forEach(function(node) {
        routes.push(isDepts ? node.node.id : node.node.slug);
    });

    return routes;
  },

  /*
    Gathers the slugs of all queries, and generates a large array of URIs
    which contains all routes with all slugs, post type and language.
  */

  getAllRoutes: async () => {
    let allRoutes = [];
    const queries = [allQueries.allServicePagesQuery, allQueries.allProcessesQuery, allQueries.allTopicsQuery, allQueries.allDepartmentsQuery];

    for (var q in queries) {
      let query = queries[q];
      let section_uri = joplinTest.getUriFromQuery(query);
      let routes = await joplinTest.getSlugs(query);
      let languages = ['']
      //languages = languages.concat(joplinTest.getLanguages());

      for (var r in routes) {
        let route = routes[r];

        for(var l in languages) {
          let langCode = languages[l];
          langCode = langCode === '' ? langCode : ("/" + langCode);
          let uri = langCode + "/" + section_uri + "/" + route;

          allRoutes.push(uri);
        }
      }
    }

    joplinTest.routes = allRoutes.splice(); // Create a copy in case it is needed
    return allRoutes.length == 0 ? null : allRoutes;
  }
};

module.exports = joplinTest;
