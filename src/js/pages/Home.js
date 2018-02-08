import React, { Component } from 'react';
import GlobalSearch from 'js/modules/GlobalSearch';
import Hero from 'js/modules/Hero';
import homepageImg from 'images/lady_bird_lake.jpg';

class Home extends Component {

  render() {
    const homepageImage = {
      file: homepageImg,
      title: 'Lady Bird Lake walking trail',
    }

		return (
			<div>
        <Hero home={true}
          callout={'Welcome to Austin.gov'}
          image={homepageImage}
        >
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
