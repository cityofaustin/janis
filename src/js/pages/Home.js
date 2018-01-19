import React, { Component } from 'react';
import GlobalSearch from 'js/modules/GlobalSearch';
import Hero from 'js/modules/Hero';

class Home extends Component {

  render() {
		return (
			<div>
        <Hero callout={'Welcome to Austin.gov'} home={true}>
          <GlobalSearch />
        </Hero>
	      <section className="wrapper coa-section">
	        <h1> Home Page </h1>️
	        <p>just a placeholder</p>
	      </section>
			</div>
    );
  }

}

export default Home;
