import React, { useState, useEffect, useMemo } from 'react';
import classNames from 'classnames';

import GuideMenu from 'components/Pages/Guide/GuideMenu';
import {hyphenate} from "./helpers";

function GuideMenuMobile({ title, contact, sections, currentSection }) {
  const [menuOpened, setMenuOpened] = useState(false);

  // Freeze the body of the page when mobile menu is opened.
  // Unfreeze the body of the page when mobile menu is closed.
  const updateBodyStyling = () => {
    if (menuOpened) {
      window.document.body.classList.add("frozen-body");
    } else {
      window.document.body.classList.remove("frozen-body");
    }
  }
  useMemo(updateBodyStyling, [menuOpened])

  // Close menu when user pressed "back" button on browser
  useEffect(()=>{
    window.onpopstate = function(event) {
      if (menuOpened) setMenuOpened(false)
    };
  })

  function toggleMenuOpened() {
    setMenuOpened(!menuOpened)
  }

  return (
    <div className="coa-GuideMenu__mobile-container" onClick={toggleMenuOpened}>
      <div className={classNames("coa-GuideMenu__mobile-popup", {
        "coa-GuideMenu__mobile-popup-open": menuOpened
      })}>
        <div className="coa-GuideMenu__mobile-background"/>
        <div className="coa-GuideMenu__mobile-content-container">
          <div className="coa-GuideMenu__mobile-content-title">
            <h2>Table of contents</h2>
            <h3>{title}</h3>
          </div>
          <div className="coa-GuideMenu__mobile-content">
            <GuideMenu
              contact={contact}
              sections={sections}
              currentSection={currentSection}
            />
          </div>
        </div>
      </div>
      <div className="coa-GuideMenu__mobile-button">
        <i className="material-icons">list</i>
        <span>Table of contents</span>
        <i className="material-icons">
          {(menuOpened) ? "expand_more" : "expand_less"}
        </i>
      </div>
    </div>
  )
}

export default GuideMenuMobile;
