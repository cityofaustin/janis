import React, { Component, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';
import { useLocation, useHistory, Link } from 'react-router-dom';

import classNames from 'classnames';
import { hyphenate } from './helpers';
import { isMobileOrTablet } from 'js/helpers/reactMediaQueries';
import { misc as i18n1 } from 'js/i18n/definitions';

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

  // Each GuideSectionWrapper has an id={this.props.anchorTag}
  // const goToSection = (e, anchorTag) => {
  //   setClickedSection(anchorTag);
  //   history.pushState(null, null, `#${anchorTag}`);
  //   document.getElementById(anchorTag).scrollIntoView(true);
  // };

  let location = useLocation();
  useEffect(() => {
    if (location && location.hash) {
      // debugger;
      console.log(location.hash);
      setClickedSection(location.hash.substring(1));

      // setTimeout(() => {
      document.getElementById(location.hash.substring(1)).scrollIntoView();
      // }, 5000);

      // const el = document.getElementById(`menu-${currentSection}`);
      // if (el) {
      //   // setTimeout(() => {
      //   el.scrollIntoView(true);
      //   // }, 5000);
      // }
    }
    // const initialClick = 'Learn-and-prepare-4';
    // setClickedSection(initialClick);
  }, [location]);

  let history = useHistory();
  useEffect(() => {
    // debugger;
    const el = document.getElementById(`menu-${currentSection}`);
    if (el) {
      if (clickedSection) {
        console.log(clickedSection);
        // If we clicked a section, we don't want to mess around with this logic
        // until we hit that section. This fires every time we scroll to a new
        // section, and is fired a bunch when the click fires off a scroll
        if (currentSection === clickedSection) {
          // We made it! back to business as usual
          // el.scrollIntoView(true);

          setClickedSection(null);
          // el.scrollIntoView(true);
          // debugger;

          // document.getElementById(currentSection).scrollIntoView(true);
          return;
        }
      } else {
        // console.log(currentSection);
        el.scrollIntoView();
        // debugger;
        // if (currentSection) {
        //   history.push(`#${currentSection}`);
        // }
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
