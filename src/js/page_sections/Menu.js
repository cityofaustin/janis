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


class Menu extends Component {
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

  toggleSublist = (e, openSectionId) => {
    console.log(openSectionId)
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

  themeClassnames = (id, theme) => {
    const base = `coa-Menu__item`;
    const openModifier = this.state.openSection === id ?
      'coa-Menu__item--open' :
      '';
    const comingSoonModifier = theme.slug === 'false' ?
      'coa-Menu__item--coming-soon' :
      '';

    return `${base} ${openModifier} ${comingSoonModifier}`;
  }

  render() {
    const { allThemes } = navigation.data;

    return allThemes.edges.length && (
      <div className="wrapper">
        <nav className={`coa-Menu ${this.props.isOpen ? 'coa-Menu--open' : ''}`} role="navigation">
          <button className="coa-Menu__close-btn d-lg-none"
            onClick={this.props.toggleMenu}
            ref="closeTrigger"
            tabIndex="0"
          >
            <CloseSVG size="40" />
          </button>
          <ul className="coa-Menu__list">
            <HomeMobileListItem handleClick={this.props.toggleMenu} />
            <AirportMobileListItem />
            <ThreeOneOneMobileListItem />
        {
          allThemes.edges.map(({node: theme}, i) => {
            return (
              <li key={i} className={this.themeClassnames(i, theme)}
                aria-expanded={this.state.openSection === i}
                aria-haspopup={true}
                aria-controls={`topicMenu${i+1}`}
                tabIndex={0}
                id={`theme${i+1}`}
                onMouseOver={(e) => this.toggleSublist(e, i)}
                onMouseOut={(e) => this.toggleSublist(e, i)}
                // TODO:
                // should onClick trigger sublist open on desktop as it does on mobile?
                // should onMouseOver/Out be disabled on mobile?
              >

                <ThemeTopListItem id={i}
                  theme={theme}
                  openSection={this.state.openSection}
                  handleClick={this.toggleSublist}
                />

                { !!theme.topics.edges && (
                  <ul className={`coa-Menu__sublist
                      ${ i > 4 ? `coa-Menu__sublist--align-right` : '' }
                      ${ this.state.openSection === i ? 'coa-Menu__sublist--open' : '' }
                    `}
                    id={`topicMenu${i+1}`}
                    role="menu"
                    aria-labelledby={`theme${i+1}`}
                  >
                  {
                    theme.topics.edges.map(({ node: topic }, id) => {
                      return topic.slug !== "false" && (
                        <TopicSubListItem
                          key={id}
                          topic={topic}
                          handleClick={this.props.toggleMenu}
                        />
                      );
                    })
                  }
                    <WorkInProgressSubitem />
                  </ul>
                )}
              </li>
            );
          })
        }
            <PrivacyPolicyListItem />
            <MobileFooter />
          </ul>
        </nav>
      </div>
    );
  }
}

const HomeMobileListItem = ({handleClick}) => (
  <li onClick={handleClick}
    className="coa-Menu__item coa-Menu__item--small d-lg-none"
  >
    <I18nNavLink to="/" exact>
      Home
    </I18nNavLink>
  </li>
)

const AirportMobileListItem = () => (
  <li className="coa-Menu__item coa-Menu__item--small d-lg-none">
    <a href="http://www.austintexas.gov/airport">
      <div className="coa-Menu__airplane-icon">
        <AirplaneSVG size="15"/>
      </div>
      <span className="d-lg-none">Airport</span>
    </a>
  </li>
)

const ThreeOneOneMobileListItem = () => (
  <li className="coa-Menu__item coa-Menu__item--flex coa-Menu__item--small d-lg-none">
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
    <span className="coa-Menu__item-text">
      { theme.title }
    </span>
    <div className="coa-Menu__plus-sign d-lg-none">
      {
        openSection === id ?
          <MinusSVG size="18" title="close section"/> :
          <PlusSVG size="18" title="open section" />
      }
    </div>
    <div className="coa-Menu__arrow-down d-none d-lg-block">
      <ChevronDownSVG size="14" />
    </div>
  </I18nNavLink>
)

const TopicSubListItem = ({ id, topic, handleClick }) => (
  <li key={id} onClick={handleClick} className="coa-Menu__subitem"
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
  <li className="coa-Menu__subitem coa-Menu__subitem--coming-soon-message">
    <a href="https://www.austintexas.gov">
      Alpha.austin.gov is a work in progress. For the full City of Austin website, visit austintexas.gov.
    </a>
  </li>
)

const PrivacyPolicyListItem = () => (
  <li className="coa-Menu__item coa-Menu__item--small d-lg-none">
    <a href="#">
      Read About Privacy
    </a>
  </li>
)

const MobileFooter = () => (
  <div>
    <p className="coa-Menu__footer-text d-lg-none">
      Alpha.austin.gov is a work in progress. For the full City of Austin website, visit <ExternalLink to="https://austintexas.gov">austintexas.gov</ExternalLink>.
    </p>
    <img className="d-lg-none" src={citySealImg} alt="City of Austin Seal"/>
  </div>
)

export default Menu;
