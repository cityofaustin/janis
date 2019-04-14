import React from 'react';
import { injectIntl } from 'react-intl';
import ThemesNav from './ThemesNav';
import staticNavData from 'stories/static_data/navigationData.js';

import MenuInfo from './MenuInfo';
import ThemesTopicsMenu from './ThemesTopicsMenu';

class FullSiteMenu extends React.Component {
  state = {
    topMenuActive: false,
  };

  handleFullSiteMenuOpen = () => {
    this.setState({
      topMenuActive: true,
    });
  };

  handleFullSiteMenuClose = () => {
    this.setState({
      topMenuActive: false,
    });
  };

  render() {
    return (
      <div
        className={
          'coa-FullSiteMenu ' +
          (this.state.topMenuActive ? 'coa-FullSiteMenu--active' : '')
        }
        onMouseLeave={this.handleFullSiteMenuClose}
      >
        <div class="wrapper container-fluid">
          <ThemesNav
            handleOnClick={this.handleFullSiteMenuOpen}
            handleOnMouseEnter={this.handleFullSiteMenuOpen}
            themes={staticNavData}
          />
        </div>
        <section className="coa-FullSiteMenu__subNav">
          <a
            className="coa-FullSiteMenu__close"
            onClick={this.handleFullSiteMenuClose}
          >
            <i className="material-icons">close</i>
          </a>
          <div class="wrapper container-fluid">
            <ThemesTopicsMenu menu={staticNavData} />
          </div>
          <MenuInfo />
        </section>
      </div>
    );
  }
}

export default injectIntl(FullSiteMenu);
