import React, { Component } from 'react';
import { Link } from 'react-static';
import { getPathWithLangCode, getPathnameWithoutLangCode } from 'js/helpers/language';
import request from 'graphql-request'
import { includes } from 'lodash';
import CloseSVG from 'js/svg/Close';
import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';

class Navmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: [],
      isLoaded: false
    };
  }

  menuClassName = () => {
    const baseClassName = `coa-Navmenu`;
    return this.props.isOpen ? `${baseClassName} ${baseClassName}--open` : baseClassName;
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

  toggleSublist = (e, openSectionId) => {
    e.preventDefault();
    if (openSectionId === this.state.openSection) {
      this.setState({
        openSection: null
      })
    } else {
      this.setState({
        openSection: openSectionId,
      })
    }
    return className;
  }

  getParentMenuItemClassName = (parentLink) => {
    const currentPath = getPathnameWithoutLangCode(this.getCurrentPath());
    const servicePaths = parentLink.services.edges
      ? parentLink.services.edges.map(({ node: serviceLink }) => {
          return `service/${serviceLink.slug}`;
        })
      : [];
    const isActive = includes(servicePaths, currentPath);
    const isActiveTopic = `topic/${parentLink.id}` === currentPath;

    return isActive || isActiveTopic ? 'usa-current' : '';
  }

  getMenuItemClassName = (path) => {
    const currentPath = getPathnameWithoutLangCode(this.getCurrentPath());
    const isMatchingPaths = currentPath === getPathnameWithoutLangCode(path);
    return isMatchingPaths ? 'usa-current' : '';
  }

  render() {

    if (!this.state.isLoaded) return 'loading...';

    const { edges: parentLinks = [] } = this.state.data;

    return parentLinks.length && (
      <div className="usa-grid-full">
        <nav className={this.menuClassName()}>
          <button className="coa-Navmenu__close-btn" onClick={this.props.toggleMenu} ref="closeTrigger" tabIndex="0">
            <CloseSVG size="40" />
          </button>
          <ul className="usa-sidenav-list">
            <li onClick={this.props.toggleMenu}>
              <Link to={'/'}
                className={this.getMenuItemClassName('/')}
              >
                Home
              </Link>
            </li>

        {
          parentLinks.map(({ node: parentLink }) => {

            let { edges: serviceLinks = [] } = parentLink.services;

            return (
              <li key={parentLink.id} onClick={this.props.toggleMenu}>
                <Link to={`/topics/${parentLink.id}`}
                  className={this.getParentMenuItemClassName(parentLink)}
                >
                  { parentLink.text }
                </Link>

                { !!serviceLinks && (
                  <ul className="usa-sidenav-sub_list">
                  {
                    serviceLinks.map(({ node:serviceLink }) => {
                      return (
                        <li key={serviceLink.id} onClick={this.props.toggleMenu}>
                          <Link to={`/services/${serviceLink.slug}`}
                            className={this.getMenuItemClassName(`/services/${serviceLink.slug}`)}
                          >
                            {serviceLink.title}
                          </Link>
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

const HomeMobileListItem = ({handleClick}) => (
  <li onClick={handleClick}
    className="coa-Navmenu__item coa-Navmenu__item--small d-lg-none"
  >
    <I18nNavLink to="/" exact>
      Home
    </I18nNavLink>
  </li>
)

const AirportMobileListItem = () => (
  <li className="coa-Navmenu__item coa-Navmenu__item--small d-lg-none">
    <a href="http://www.austintexas.gov/airport">
      <div className="coa-Navmenu__airplane-icon">
        <AirplaneSVG size="15"/>
      </div>
      <span className="d-lg-none">Airport</span>
    </a>
  </li>
)

const ThreeOneOneMobileListItem = () => (
  <li className="coa-Navmenu__item coa-Navmenu__item--flex coa-Navmenu__item--small d-lg-none">
    <a href="tel:311">
      Call 311
    </a>
    &nbsp;or&nbsp;
    <a href="http://311.austintexas.gov/">
      Submit an Online Request
    </a>
  </li>
)

const ThemeTopListItem = ({ theme, e, id, openSection, handleClick }) => (
  <I18nNavLink to={`/theme/${theme.slug}`} key={id}
    activeClassName="usa-current"
    onClick={(e) => handleClick(e, id)}
  >
    <span className="coa-Navmenu__item-text">
      { theme.title }
    </span>
    <div className="coa-Navmenu__plus-sign d-lg-none">
      {
        openSection === id ?
          <MinusSVG size="18" title="close section"/> :
          <PlusSVG size="18" title="open section" />
      }
    </div>
    <div className="coa-Navmenu__arrow-down d-none d-lg-block">
      <ChevronDownSVG size="14" />
    </div>
  </I18nNavLink>
)

const TopicSubListItem = ({ id, topic, handleClick }) => (
  <li key={id} onClick={handleClick} className="coa-Navmenu__subitem"
    role="menuitem"
  >
    <I18nNavLink to={`/topics/${topic.slug}`}
      activeClassName="usa-current"
      className="test"
      tabIndex={-1}
    >
      {topic.title}
    </I18nNavLink>
  </li>
)

const WorkInProgressSubitem = () => (
  <li className="coa-Navmenu__subitem coa-Navmenu__subitem--coming-soon-message">
    <a href="https://www.austintexas.gov">
      Alpha.austin.gov is a work in progress. For the full City of Austin website, visit austintexas.gov.
    </a>
  </li>
)

const PrivacyPolicyListItem = () => (
  <li className="coa-Navmenu__item coa-Navmenu__item--small d-lg-none">
    <a href="#">
      Read About Privacy
    </a>
  </li>
)

const MobileFooter = () => (
  <div>
    <p className="coa-Navmenu__footer-text d-lg-none">
      Alpha.austin.gov is a work in progress. For the full City of Austin website, visit <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>.
    </p>
    <img className="d-lg-none" src={citySealImg} alt="City of Austin Seal"/>
  </div>
)

export default Navmenu;
