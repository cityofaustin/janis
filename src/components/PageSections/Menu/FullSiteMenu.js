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

  handleOnClick = () => {
    this.setState({
      topMenuActive: !this.state.topMenuActive,
    });
  };

  render() {
    return (
      <div
        className={
          'coa-FullSiteMenu ' +
          (this.state.topMenuActive ? 'coa-FullSiteMenu--active' : '')
        }
      >
        <ThemesNav handleOnClick={this.handleOnClick} themes={staticNavData} />
        <section className="coa-FullSiteMenu__subNav">
          <ThemesTopicsMenu menu={staticNavData} />
          <MenuInfo />
        </section>
      </div>
    );
  }
}

export default injectIntl(FullSiteMenu);
