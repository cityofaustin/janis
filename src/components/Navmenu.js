import React, { Component } from 'react';
import axios from 'axios';
import { uniq, includes } from 'lodash';

class Navmenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nav: []
    };
  }

  menuClassName = () => {
    const baseClassName = `coa-Header__nav`;
    return this.props.isOpen ? `${baseClassName}--open` : baseClassName;
  }

  componentDidMount () {
    const endpoint = [
      `${process.env.REACT_APP_CMS_ENDPOINT}/pages/`,
      `?format=json&type=base.ServicePage&fields=topic(text)`,
    ].join('')

    axios
      .get(endpoint)
      .then(res => {
        const leData = res.data.items;
        const topics = uniq(leData.map((item) => item.topic.text))

        const getServicesByTopic = (title) => {
          return leData.filter((service) => {
            return service.topic.text === title
          })
        }

        const nav = topics.map((title) => {
        	return {
        		title: title,
        		services: getServicesByTopic(title),
        	}
        })

        this.setState({ nav: nav })
      })
      .catch(err => console.log(err))
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

  getParentMenuItemClassName = (topic) => {
    const pathname = this.getCurrentPath()

    const currentId = Number(pathname.split('/')[2]) // this is brittle
    const serviceIds = topic.services.map((service) => service.id)
    const isActive = includes(serviceIds, currentId)

    return isActive ? 'usa-current' : ''
  }

  render() {
    return (
      <div className="usa-grid-full">
        <nav role="navigation" className={this.menuClassName()}>
          <span onClick={this.props.toggleMenu}>x</span>
          <ul className="usa-sidenav-list">
            <li>
              <a href="/" className={this.getMenuItemClassName('/')}>Home</a>
            </li>
            { this.state.nav && this.state.nav.map((topic) => {
              return (
                <li>
                  <a className={this.getParentMenuItemClassName(topic)} href="/services">
                    {topic.title}
                  </a>
                  <ul className="usa-sidenav-sub_list">
                  { topic.services.map((service) => {
                    return (
                      <li>
                        <a className={this.getMenuItemClassName(`/service/${service.id}`)}
                          href={`/service/${service.id}`}
                        >
                          {service.title}
                        </a>
                      </li>
                    )
                  })}
                  </ul>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    );
  }

}

export default Navmenu;
