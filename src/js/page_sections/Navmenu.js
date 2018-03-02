import React, { Component } from 'react';
import request from 'graphql-request'
import CloseSVG from 'js/svg/Close';
import I18nNavLink from 'js/modules/I18nNavLink'
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

    // if (!this.state.isLoaded) return 'loading...';

    const { themes } = navigation;
    // const { edges: parentLinks = [] } = this.state.data;


    return themes.length && (
      <div className="usa-grid-full">
        <nav className={`coa-Navmenu ${this.props.isOpen ? 'coa-Navmenu--open' : ''}`}>
          <button className="coa-Navmenu__close-btn" onClick={this.props.toggleMenu} ref="closeTrigger" tabIndex="0">
            <CloseSVG size="40" />
          </button>
          <ul className="usa-sidenav-list">
            <li onClick={this.props.toggleMenu}>
              <I18nNavLink
                to="/"
                exact
                activeClassName="usa-current"
              >
                Home
              </I18nNavLink>
            </li>

        {
          themes.map((theme, i) => {
            return (
              <li key={parentLink.id} onClick={this.props.toggleMenu}>
                <I18nNavLink to={`/topics/${parentLink.id}`}
                  activeClassName="usa-current"
                >
                  { parentLink.text }
                </I18nNavLink>

                {/* { !!serviceLinks && (
                  <ul className="usa-sidenav-sub_list">
                  {
                    serviceLinks.map(({ node:serviceLink }) => {
                      return (
                        <li key={serviceLink.id} onClick={this.props.toggleMenu}>
                          <I18nNavLink to={`/services/${serviceLink.slug}`}
                            activeClassName="usa-current"
                          >
                            {serviceLink.title}
                          </I18nNavLink>
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
