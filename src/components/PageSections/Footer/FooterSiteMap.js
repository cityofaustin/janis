import React from 'react';
import { withSiteData } from 'react-static';
import { injectIntl } from 'react-intl';
import ThemesTopicsMenu from 'components/PageSections/Menu/ThemesTopicsMenu';
import ThemesTopicsMobileMenu from 'components/PageSections/Menu/ThemesTopicsMobileMenu';

const FooterSiteMap = ({ intl, navigation }) => {
  const menu = navigation[intl.locale];
  return (
    <React.Fragment>
      <div className="coa-FooterSiteMap">
        <div className="container-fluid wrapper">
          <ThemesTopicsMenu
            menu={menu}
            extraClasses={'coa-ThemesTopicsMenu--FooterSiteMap'}
          />
        </div>
      </div>
      <div className="coa-FooterMobileSiteMap">
        <ThemesTopicsMobileMenu menu={menu} />
      </div>
    </React.Fragment>
  );
};

export default withSiteData(injectIntl(FooterSiteMap));
