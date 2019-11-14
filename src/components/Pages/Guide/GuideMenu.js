import React, { Component, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useLocation, Link } from 'react-router-dom';

import classNames from 'classnames';
import { hyphenate } from './helpers';
import { isMobileOrTablet } from 'js/helpers/reactMediaQueries';
import { misc as i18n1 } from 'js/i18n/definitions';
import scrollIntoView from 'scroll-into-view';

const GuideMenuLink = ({ title, anchorTag, isHeading, isCurrentSection }) => {
  return (
    <div
      className={classNames('coa-GuideMenu__link-wrapper', {
        'coa-GuideMenu__current-section': isCurrentSection,
      })}
      id={`menu-${anchorTag}`}
    >
      <Link
        className={classNames('coa-GuideMenu__link', {
          'coa-GuideMenu__heading': isHeading,
          'coa-GuideMenu__subheading': !isHeading,
          'coa-GuideMenu__current-section': isCurrentSection,
        })}
        to={`#${anchorTag}`}
      >
        <span className="coa-GuideMenu__title-text">{title}</span>
      </Link>
    </div>
  );
};

function GuideMenuSection({ section, currentSection }) {
  const headingAnchorTag = hyphenate(section.heading);
  const subHeadings = section.pages.map((page, index) => {
    const title =
      (page.servicePage && page.servicePage.title) ||
      (page.informationPage && page.informationPage.title);
    const anchorTag = `${headingAnchorTag}-${index + 1}`;
    return {
      title,
      anchorTag,
    };
  });

  return (
    <div className="coa-GuideMenu__section">
      <GuideMenuLink
        title={section.heading}
        anchorTag={headingAnchorTag}
        isHeading={true}
        isCurrentSection={currentSection === headingAnchorTag}
      />
      {subHeadings.map((subHeading, index) => (
        <GuideMenuLink
          key={index}
          title={subHeading.title}
          anchorTag={subHeading.anchorTag}
          isHeading={false}
          isCurrentSection={currentSection === subHeading.anchorTag}
        />
      ))}
    </div>
  );
}

const GuideMenu = ({ contact, sections, currentSection, intl }) => {
  const [clickedSection, setClickedSection] = useState(null);
  /*

  Dear future developers trying to improve/replace the 
  guide page table of contents/scrolling code, I wish you
  all the best. 

  In order to work correctly -
  • when a user scrolls:
    • the current section appears "selected" in the TOC
    • the current section is on screen in the TOC
  • when loading the page with an anchor link:
    • the linked section is scrolled to the top
    • the corresponding TOC section is selected and visible
  • when clicking a link in the TOC
    • the url is updated to reflect the link anchor
    • the clicked section is scrolled to the top
    • the corresponding TOC section is selected and visible


  In this implementation, I have found a few issues, most of
  them stem from trying to scroll 2 things at once:
   • Table of contents
   • Main content

  Known Issues:
   • if you enter a new anchor link in the url when the page is already loaded, 
     it will scroll to the new section but not update the scrolling on the TOC

   • if we have dynamic content (like recollect that changes height after loading)
     we don't correctly recalculate the size of the sections, so everything will
     be off by a little bit (existing bug I'm pretty sure)

   • scrolling down after clicking a section lower down allows the selected
     TOC item to be offscreen again

  Things I've tried:
   • The current implementation (detailed in comments below)
   • Playing with setTimeout to fake concurrent scrolling
   • Using https://www.npmjs.com/package/scroll-into-view
     • Led to UI freezes
     • Jumpy scrolling around a bit
   • Another branch (https://github.com/cityofaustin/janis/tree/3094-guide-page-toc) that:
     • Didn't use any react-router-dom hooks
     • Didn't use react-router-dom links
     • Had complex logic including goToSection
     • Failed super hard when trying to get anchor links to work 
    
  */

  // This is fired every time the page location is updated
  // This means on:
  //  • First load (seeing if we have an anchor in the URL)
  //  • TOC link clicks (uses react-router-dom)
  let location = useLocation();
  useEffect(() => {
    if (location && location.hash) {
      // By setting the section to "clicked" we won't try to
      // scroll the TOC until after we scroll to the correct section
      // in the main content
      setClickedSection(location.hash.substring(1));

      // Scroll the main content section into view
      document.getElementById(location.hash.substring(1)).scrollIntoView();
    }
  }, [location]);

  // This is fired every time the main content scrolls to a new section
  // this means it happens when:
  //  • A user scrolls
  //  • The page automatically scrolls when loading with an #anchor in the url
  //  • The page automatically scrolls when a TOC link is clicked
  useEffect(() => {
    // If we clicked a section, we don't want to scroll the TOC until we
    // finish scrolling the main content, as scrolling two things at once
    // causes all sorts of silly problems
    if (clickedSection) {
      if (currentSection === clickedSection) {
        // Once we've gotten to our section, we clear out the click and let the standard
        // logic fire
        setClickedSection(null);
        return;
      }
    } else {
      // If we have a menu item for this, we want to scroll to it
      const el = document.getElementById(`menu-${currentSection}`);
      if (el) {
        // As per https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollIntoView -
        // I'm using the verbose scrollIntoViewOptions here. One thing i've noticed is that
        // changing behavior to "smooth" causes this to fail completely, this makes me think that
        // we might be encountering issues of dom update priority between user scrolling and
        // updating this.
        el.scrollIntoView({
          behavior: 'auto',
          block: 'start',
        });
      }
    }
  }, [currentSection]);

  return (
    <div>
      <div className="coa-GuideMenu__section">
        {contact && (
          <GuideMenuLink
            title={intl.formatMessage(i18n1.contactInformation)}
            anchorTag="Contact-information"
            isHeading={true}
            isCurrentSection={currentSection === 'Contact-information'}
          />
        )}
      </div>
      {sections.map((section, index) => (
        <GuideMenuSection
          key={index}
          section={section}
          currentSection={currentSection}
        />
      ))}
    </div>
  );
};

export default injectIntl(GuideMenu);
