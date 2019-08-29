import React, { useState, useEffect, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import {hyphenate} from "./helpers";

function GuideSidebarMobile({ contact, sections, currentSection }) {
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

  function toggleMenuOpened() {
    setMenuOpened(!menuOpened)
  }

  const arrowIcon = (menuOpened) ? "expand_more" : "expand_less";

  return (
    <div className="coa-GuideSidebar__mobile-table-of-contents-container" onClick={toggleMenuOpened}>
      {menuOpened && (
        <div className="popup">
        </div>
      )}
      <div className="coa-GuideSidebar__mobile-table-of-contents-button">
        <i className="material-icons">list</i>
        <span>Table of Contents</span>
        <i className="material-icons">{arrowIcon}</i>
      </div>
    </div>
  )
}

export default GuideSidebarMobile;
