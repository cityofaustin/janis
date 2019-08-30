import React from 'react';

import GuideMenuMobile from 'components/Pages/Guide/GuideMenuMobile';
import GuideMenu from 'components/Pages/Guide/GuideMenu';
import { isMobileOrTablet } from 'js/helpers/reactMediaQueries';

function GuideMenuSwitch({ title, contact, sections, currentSection }){
  if (isMobileOrTablet()) {
    return (
      <GuideMenuMobile
        title={title}
        contact={contact}
        sections={sections}
        currentSection={currentSection}
      />
    )
  } else {
    return (
      <div className="coa-GuideMenu__desktop-container sticky">
        <GuideMenu
          contact={contact}
          sections={sections}
          currentSection={currentSection}
        />
      </div>
    )
  }
}

export default GuideMenuSwitch;
