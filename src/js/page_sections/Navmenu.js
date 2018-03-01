import React, { Component } from 'react';
import { Link } from 'react-static';
import { getPathWithLangCode, getPathnameWithoutLangCode } from 'js/helpers/language';
import request from 'graphql-request'
import { includes } from 'lodash';
import CloseSVG from 'js/svg/Close';
import allTopicPagesQuery from 'js/queries/allTopicPagesQuery';
import navigation from '__tmpdata/navigation';

class Navmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      // isLoaded: false
    };
    console.log(navigation)
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
    return 'test'
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
    return 'test'
    const currentPath = getPathnameWithoutLangCode(this.getCurrentPath());
    const isMatchingPaths = currentPath === getPathnameWithoutLangCode(path);
    return isMatchingPaths ? 'usa-current' : '';
  }

  render() {

    // if (!this.state.isLoaded) return 'loading...';

    const { themes } = navigation;
    // const { edges: parentLinks = [] } = this.state.data;


    return themes.length && (
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
          themes.map((theme, i) => {
            return (
              <li key={i} onClick={this.props.toggleMenu}>
                <Link to={`/topics/${theme.slug}`}
                  className={this.getParentMenuItemClassName(theme)}
                >
                  { theme.title }
                </Link>

                {/* { !!serviceLinks && (
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
                )} */}
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
