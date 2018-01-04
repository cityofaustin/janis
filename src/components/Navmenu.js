import React, { Component } from 'react';
import axios from 'axios';
import { uniq, includes } from 'lodash';
import CloseSVG from 'js/svg/Close';
import { Link } from 'react-router-dom';
import NAVMENU_ENDPOINT from 'constants/endpoints';

class Navmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: []
    };
  }

  menuClassName = () => {
    const baseClassName = `coa-Navmenu`;
    return this.props.isOpen ? `${baseClassName} ${baseClassName}--open` : baseClassName;
  }

  focusOnClose = () => {
    this.refs.closeTrigger.focus()
  }

  componentDidMount () {
    const endpoint = NAVMENU_ENDPOINT

    axios
      .get(endpoint)
      .then(res => {
        const leData = res.data.items;
        const parentNavItems = uniq(leData.map((item) => item.topic.text))

        const getChildrenNavItemsByParent = (title) => {
          return leData.filter((data) => {
            return data.topic.text === title
          })
        }

        const nav = parentNavItems.map((title) => {
        	return {
        		parentTitle: title,
        		children: getChildrenNavItemsByParent(title),
        	}
        })

        this.setState({ nav: nav })
      })
      .catch(err => console.log(err))
  }

  componentDidUpdate() {
    if (this.props.isOpen) {
      this.focusOnClose()
    }
  }

  getCurrentPath = () => {
    // this is dependent on react-router. We may want to use
    // `window.location.href` instead.
    return this.props.location.pathname
  }

  getMenuItemClassName = (path) => {
    const pathname = this.getCurrentPath()
    return pathname === path ? 'usa-current' : ''
  }

  getOverlayClassName = () => {
    let className = `coa-Navmenu__overlay`;
    if (this.props.isOpen) {
      className = `${className} ${className}--open`
    }
    return className
  }

  getParentMenuItemClassName = (topic) => {
    const pathname = this.getCurrentPath()

    const currentId = Number(pathname.split('/')[2]) // this is brittle
    const childrenIds = topic.children.map((child) => child.id)
    const isActive = includes(childrenIds, currentId)

    return isActive ? 'usa-current' : ''
  }

  render() {
    return (
      <div className="usa-grid-full">
        <nav role="navigation" className={this.menuClassName()}>
          <button className="coa-Navmenu__close-btn" onClick={this.props.toggleMenu} ref="closeTrigger" tabIndex="0">
            <CloseSVG size="40" />
          </button>
          <ul className="usa-sidenav-list">
            <li>
              <Link to="/" className={this.getMenuItemClassName('/')}>Home</Link>
            </li>
            { this.state.nav && this.state.nav.map((parent) => {
              return (
                <li>
                  <Link to="/services" className={this.getParentMenuItemClassName(parent)}>
                    {parent.parentTitle}
                  </Link>
                  <ul className="usa-sidenav-sub_list">
                  { parent.children.map((child) => {
                    return (
                      <li>
                        <Link to={`/service/${child.id}`}
                          className={this.getMenuItemClassName(`/service/${child.id}`)}
                        >
                          {child.title}
                        </Link>
                      </li>
                    )
                  })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>
        <div className={this.getOverlayClassName()}></div>
      </div>
    );
  }

}

export default Navmenu;
