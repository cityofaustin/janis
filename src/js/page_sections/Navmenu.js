import React, { Component } from 'react';
import request from 'graphql-request';

import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import I18nNavLink from 'js/modules/I18nNavLink';
import ExternalLink from 'js/modules/ExternalLink';
import navigation from '__tmpdata/navigation';

import ChevronDownSVG from 'js/svg/ChevronDown';
import CloseSVG from 'js/svg/Close';
import AirplaneSVG from 'js/svg/Airplane';
import PlusSVG from 'js/svg/Plus';
import MinusSVG from 'js/svg/Minus';
import citySealImg from 'images/coa_seal.png';


class Navmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSection: null,
    };
    this.DESKTOP_BREAKPOINT = 1080;
  }

  focusOnClose = () => {
    this.refs.closeTrigger && this.refs.closeTrigger.focus();
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen && !prevProps.isOpen) {
      this.focusOnClose();
    }
  }

  toggleMobileSublist = (e, openSectionId) => {
    if (window.innerWidth < this.DESKTOP_BREAKPOINT) {
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
    }
  }

  themeClassnames = (id, theme) => {
    const base = `coa-Navmenu__item`;
    const openModifier = this.state.openSection === id ?
      'coa-Navmenu__item--open' :
      '';
    const comingSoonModifier = theme.slug === 'false' ?
      'coa-Navmenu__item--coming-soon' :
      '';

    return `${base} ${openModifier} ${comingSoonModifier}`;
  }

  render() {
    const { allThemes } = navigation.data;

    return allThemes.edges.length && (
      <div className="wrapper">
        <nav className={`coa-Navmenu ${this.props.isOpen ? 'coa-Navmenu--open' : ''}`} role="navigation">
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
          allThemes.edges.map(({node: theme}, i) => {

            return (
              <li key={i} className={this.themeClassnames(i, theme)}>
                <I18nNavLink to={`/theme/${theme.slug}`}
                  activeClassName="usa-current"
                  onClick={(e) => this.toggleMobileSublist(e, i)}
                >
                  <span className="coa-Navmenu__item-text">
                    { theme.title }
                  </span>
                  <div className="coa-Navmenu__plus-sign d-lg-none">
                    {
                      this.state.openSection === i ?
                        <MinusSVG size="18" title="close section"/> :
                        <PlusSVG size="18" title="open section" />
                    }
                  </div>
                  <div className="coa-Navmenu__arrow-down d-none d-lg-block">
                    <ChevronDownSVG size="14" />
                  </div>
                </I18nNavLink>

                { !!theme.topics.edges && (
                  <ul className={`coa-Navmenu__sublist ${this.state.openSection === i ? 'coa-Navmenu__sublist--open' : ''}`}>
                  {
                    theme.topics.edges.map(({ node: topic }, i) => {
                      return topic.slug !== "false" && (
                        <li key={i} onClick={this.props.toggleMenu} className="coa-Navmenu__subitem">
                          <I18nNavLink to={`/topics/${topic.slug}`}
                            activeClassName="usa-current"
                            className="test"
                          >
                            {topic.title}
                          </I18nNavLink>
                        </li>
                      );
                    })
                  }
                    <li className="coa-Navmenu__subitem coa-Navmenu__subitem--coming-soon-message">
                      <a href="https://www.austintexas.gov">
                        This site is a work in progress. More topics coming soon. Visit austintexas.gov for more topics.
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            );
          })
        }
            <li className="coa-Navmenu__item coa-Navmenu__item--small d-lg-none">
              <a href="#">
                Read About Privacy
              </a>
            </li>
            <p className="coa-Navmenu__footer-text d-lg-none">
              Alpha.austin.gov is a new website and a work in progress. For the full City of Austin website, visit <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>. Learn more about the new website at <ExternalLink to="https://bit.ly/atx-digital-services">projects.austintexas.io</ExternalLink>.
            </p>
            <img className="d-lg-none" src={citySealImg} alt="City of Austin Seal"/>
          </ul>
        </nav>
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
