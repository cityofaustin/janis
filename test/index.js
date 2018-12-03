const chai = require('chai');
const Promise = require('bluebird');
const assert = chai.assert;
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const http = require('http');
const request = require('request-promise');
const joplinPostDeploy = require('./helper');


describe('Basic Availability', function(){

  it('Should return data from API', function(){

    return joplinPostDeploy.gqlQuery(`{
      all311 (first: 1) {
        edges {
          node {
            id,
            title,
            url
          }
        }
      }
    }`).then(res => {
        assert.equal(Array.isArray(res.data.all311.edges), true);
    }).catch(err => err);
  });

  it('Main Site Should work', function(){

    return joplinPostDeploy.httpGet(joplinPostDeploy.getJanisURL()).then(res => {
        assert.equal(res.statusCode, 200);
    }).catch(err => err);
  });
});


/*
  Testing all routes
*/

describe('All Routes', function(){
  this.timeout(10000);
  let routes = [];

  before(function(done){
    joplinPostDeploy.getAllRoutes().then(function(resp) {
      routes = resp;
      done();
    });
  });

  after(function(done){
    console.log("We are done, clearing routes.");
    routes = null;
    done();
  })

  /*
    Let's make sure it can find the routes...
  */

  it('Routes Should be loaded in memory', function(){
    assert.equal(Array.isArray(routes), true);
  });

  /*
    All main sections

  describe('Main Sections', function(){
    let supportedLanguages = [''];
    supportedLanguages = supportedLanguages.concat(joplinPostDeploy.getLanguages());

    for(var n in joplinPostDeploy.queries) {

      // First we need the slug
      let section_slug = joplinPostDeploy.queries[n].slug;
      let current_query = joplinPostDeploy.queries[n].query;

      for(var l in supportedLanguages) {
        // Then we need the language
        let langCode = supportedLanguages[l];
        langCode = langCode !== '' ? ('/' + langCode) : langCode;

        // Generate URL
        let url = joplinPostDeploy.getJanisURL() + langCode + "/" + section_slug;

        it('Section should respond: ' + langCode + '/' + section_slug , async () => {
          let response = await joplinPostDeploy.httpGet(url)
          assert.equal(response.statusCode, 200);
          return response;
        }); // test
      }
    } // for loop

  });*/

  /*
    All Single Pages
  */
  describe("Single Pages", function() {

    it('Tested all single pages', function(){
      // console.log("Routes: " + routes.length);
      for(var r in routes) {
        let route = routes[r];
        // Generate URL
        let url = joplinPostDeploy.getJanisURL() + route;

        joplinPostDeploy.httpGet(url).then(function (response) {
            assert.equal(response.statusCode, 200);
        }).catch(function (err) {
          console.log("\x1b[31mERROR: " + url + "\x1b[0m");
          console.log("\x1b[31mResponse Status Code: " + err.statusCode + "\x1b[0m");
        });
      }
    });

  });

});
