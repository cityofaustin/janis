import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getPathWithLangCode, getPathnameWithoutLangCode } from 'js/helpers/language';
import axios from 'axios';
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
    this.refs.closeTrigger.focus();
  }

  componentDidMount () {

    axios
      .post(`${process.env.REACT_APP_CMS_ENDPOINT}/graphql/`, {
        query: allTopicPagesQuery
      })
      .then(res => {
        this.setState({
          data: res.data.data.allTopics,
          isLoaded: true
        });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      this.focusOnClose();
    }
  }

  getCurrentPath = () => {
    // this is dependent on react-router. We may want to use
    // `window.location.href` instead.
    return this.props.location.pathname;
  }

  getOverlayClassName = () => {
    let className = `coa-Navmenu__overlay`;
    if (this.props.isOpen) {
      className = `${className} ${className}--open`;
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

    return isActive ? 'usa-current' : '';
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
              <Link to={getPathWithLangCode("/")}
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
                <Link to={getPathWithLangCode(`/topic/${parentLink.id}`)}
                  className={this.getParentMenuItemClassName(parentLink)}
                >
                  { parentLink.text }
                </Link>

                { serviceLinks.length && (
                  <ul className="usa-sidenav-sub_list">
                  {
                    serviceLinks.map(({ node:serviceLink }) => {
                      return (
                        <li key={serviceLink.id} onClick={this.props.toggleMenu}>
                          <Link to={getPathWithLangCode(`/service/${serviceLink.slug}`)}
                            className={this.getMenuItemClassName(`/service/${serviceLink.slug}`)}
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

export default Navmenu;
