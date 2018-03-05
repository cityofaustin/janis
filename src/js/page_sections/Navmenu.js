import React, { Component } from 'react';
import request from 'graphql-request';

import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import I18nNavLink from 'js/modules/I18nNavLink';
import ExternalLink from 'js/modules/ExternalLink';
import navigation from '__tmpdata/navigation';

import ChevronDownSVG from 'js/svg/ChevronDown';
import CloseSVG from 'js/svg/Close';
import AirplaneSVG from 'js/svg/Airplane';
import citySealImg from 'images/coa_seal.png';



class Navmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // isLoaded: false
    };
    console.log(navigation)
  }

  focusOnClose = () => {
    this.refs.closeTrigger && this.refs.closeTrigger.focus();
  }

  componentDidMount () {
    request(
      `${process.env.CMS_API}`,
      allTopicPagesQuery,
    ).then(res => {
      this.setState({
        data: res.allTopics,
        isLoaded: true
      });
    }).catch(err => console.log(err));
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      this.focusOnClose();
    }
  }

  getOverlayClassName = () => {
    let className = `coa-Navmenu__overlay`;
    if (this.props.isOpen) {
      className = `${className} ${className}--open`;
    }
    return className;
  }

  render() {
    const { themes } = navigation;


    return themes.length && (
      <div className="wrapper">
        <nav className={`coa-Navmenu ${this.props.isOpen ? 'coa-Navmenu--open' : ''}`}>
          <button className="coa-Navmenu__close-btn d-lg-none" onClick={this.props.toggleMenu} ref="closeTrigger" tabIndex="0">
            <CloseSVG size="40" />
          </button>
          <ul className="coa-Navmenu__list">
            <li onClick={this.props.toggleMenu} className="coa-Navmenu__item coa-Navmenu__item--small d-lg-none">
              <I18nNavLink
                to="/"
                exact
              >
                Home
              </I18nNavLink>
            </li>
            <li className="coa-Navmenu__item coa-Navmenu__item--small d-lg-none">
              <a href="http://www.austintexas.gov/airport">
                <div className="coa-Navmenu__airplane-icon">
                  <AirplaneSVG size="15"/>
                </div>
                <span className="d-lg-none">Airport</span>
              </a>
            </li>
            <li className="coa-Navmenu__item coa-Navmenu__item--flex coa-Navmenu__item--small d-lg-none">
              <a href="tel:311">
                Call 311
              </a>
              &nbsp;or&nbsp;
              <a href="http://311.austintexas.gov/">
                Submit an Online Request
              </a>
            </li>
        {
          themes.map((theme, i) => {
            return (
              <li key={i} onClick={this.props.toggleMenu} className="coa-Navmenu__item">
                <I18nNavLink to={`/topics/${theme.slug}`}
                  activeClassName="usa-current"
                >
                  <span className="coa-Navmenu__item-text">
                    { theme.title }
                  </span>
                  <div className="coa-Navmenu__arrow-down d-none d-lg-block">
                    <ChevronDownSVG size="14" />
                  </div>
                </I18nNavLink>

                { !!theme.topics && (
                  <ul className="coa-Navmenu__sublist">
                  {
                    theme.topics.map(({ title, slug }, i) => {
                      return (
                        <li key={i} onClick={this.props.toggleMenu} className="coa-Navmenu__subitem">
                          <I18nNavLink to={`/services/${slug}`}
                            activeClassName="usa-current"
                            className="test"
                          >
                            {title}
                          </I18nNavLink>
                        </li>
                      );
                    })
                  }
                  </ul>
                )}
              </li>
            );
          })
        }
            <li className="coa-Navmenu__item coa-Navmenu__item--small d-lg-none">
              <a href="#">
                Read Abour Privacy
              </a>
            </li>
            <p>
              Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>. Learn more about the new website at <ExternalLink to="https://bit.ly/atx-digital-services">projects.austintexas.io</ExternalLink>.
            </p>
            <img src={citySealImg} alt="City of Austin Seal"/>
          </ul>
        </nav>
        <div className={this.getOverlayClassName()}
          onClick={this.props.toggleMenu}
        >
        </div>
      </div>
    );
  }

}

export default Navmenu;
