import React, { Component } from 'react';
import GlobalSearch from 'js/modules/GlobalSearch';

class Home extends Component {

  render() {
		return (
			<div>
        <div className="coa-main__hero">
  		   	<div className="wrapper">
            <div className="coa-main__hero__callout">
              <h2>Welcome to Austin.gov</h2>
              <GlobalSearch />
            </div>
          </div>
	      </div>
	      <section className="wrapper coa-section">
	        <h1> Home Page </h1>️
	        <p>just a placeholder</p>
	      </section>
			</div>
    );
  }

}

export default Home;
