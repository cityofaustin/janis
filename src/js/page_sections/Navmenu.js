import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import getPathWithLangCode from 'js/helpers/language';
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

  getMenuClassName = () => {
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

  getOverlayClassName = () => {
    let className = `coa-Navmenu__overlay`;
    if (this.props.isOpen) {
      className = `${className} ${className}--open`;
    }
    return className;
  }

  render() {

    if (!this.state.isLoaded) return 'loading...';

    const { edges: parentLinks = [] } = this.state.data;

    return parentLinks.length && (
      <div className="usa-grid-full">
        <nav className={this.getMenuClassName()}>
          <button className="coa-Navmenu__close-btn" onClick={this.props.toggleMenu} ref="closeTrigger" tabIndex="0">
            <CloseSVG size="40" />
          </button>
          <ul className="usa-sidenav-list">
            <li onClick={this.props.toggleMenu}>
              <NavLink
                to={getPathWithLangCode("/")}
                activeClassName="usa-current"
              >
                Home
              </NavLink>
            </li>

        {
          parentLinks.map(({ node: parentLink }) => {

            let { edges: serviceLinks = [] } = parentLink.services;

            return (
              <li key={parentLink.id} onClick={this.props.toggleMenu}>
                <NavLink to={getPathWithLangCode(`/topic/${parentLink.id}`)}
                  activeClassName="usa-current"
                >
                  { parentLink.text }
                </NavLink>

                { serviceLinks.length && (
                  <ul className="usa-sidenav-sub_list">
                  {
                    serviceLinks.map(({ node:serviceLink }) => {
                      return (
                        <li key={serviceLink.id} onClick={this.props.toggleMenu}>
                          <NavLink to={getPathWithLangCode(`/service/${serviceLink.slug}`)}
                            activeClassName="usa-current"
                          >
                            {serviceLink.title}
                          </NavLink>
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
