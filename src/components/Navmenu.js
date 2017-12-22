import React, { Component } from 'react';
import axios from 'axios';
import { groupBy, forEach, mapValues, uniq } from 'lodash';

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
        // const navByTopic = groupBy(leData, 'topic.text')
        // const nav = Array.from(navByTopic)
        const topics = uniq(leData.map((item) => item.topic.text))
        // const topics = uniq(topicsAll)

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

        debugger

        this.setState({ nav: nav })
      })
      .catch(err => console.log(err))
  }

  render() {
    debugger
    return (
      <div>
        <nav role="navigation" className={this.menuClassName()}>
          <span onClick={this.props.toggleMenu}>x</span>
          {console.log(this.state.nav)}
          <ul>
          { this.state.nav && this.state.nav.map((topic) => {
            return <li>{topic.title}</li>
          })}
          </ul>
        </nav>
      </div>
    );
  }

}

export default Navmenu;
