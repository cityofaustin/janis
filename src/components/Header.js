import React, { Component } from 'react';

class Header extends Component {

  render() {
    return (

      <header className="usa-header usa-header-basic" role="banner">
        <div className="usa-nav-container">
          <div className="usa-navbar">
            <div className="usa-logo" id="basic-logo">
              <em className="usa-logo-text">
                <a href="/" title="Home" aria-label="Home">
                  Welcome to Janis <span role="img" aria-label="peace sign">☮️</span>
                </a>
              </em>
            </div>
            <button className="usa-menu-btn">Menu</button>
          </div>

          <nav role="navigation" className="usa-nav">
            <button className="usa-nav-close">
            <img src="/assets/img/close.svg" alt="close" />
            </button>
            <ul className="usa-nav-primary usa-accordion">
              <li>
                <button className="usa-accordion-button usa-nav-link" aria-expanded="false" aria-controls="basic-nav-section-one">
                  <span>Section title</span>
                </button>
                <ul id="basic-nav-section-one" className="usa-nav-submenu" aria-hidden="true">
                  <li>
                    <a href="#">Subsection title</a>
                  </li>
                  <li>
                    <a href="#">Subsection title</a>
                  </li>
                  <li>
                    <a href="#">Subsection title</a>
                  </li>
                </ul>
              </li>
              <li>
                <button className="usa-accordion-button usa-nav-link" aria-expanded="false" aria-controls="basic-nav-section-two">
                  <span>Simple terms</span>
                </button>
                <ul id="basic-nav-section-two" className="usa-nav-submenu" aria-hidden="true">
                  <li>
                    <a href="#">Subsection title</a>
                  </li>
                  <li>
                    <a href="#">Subsection title</a>
                  </li>
                  <li>
                    <a href="#">Subsection title</a>
                  </li>
                </ul>
              </li>
              <li>
                <a className="usa-nav-link" href="javascript:void(0)">
                  <span>Distinct from each other</span>
                </a>
              </li>
            </ul>
            <form className="usa-search usa-search-small ">
              <div role="search">
                <label className="usa-sr-only" for="basic-search-field-small">Search small</label>
                <input id="basic-search-field-small" type="search" name="search" />
                <button type="submit">
                  <span className="usa-sr-only">Search</span>
                </button>
              </div>
            </form>
          </nav>
        </div>
      </header>
    );
  }

}

export default Header;
