import React, { Component, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';

import classNames from 'classnames';
import { hyphenate } from './helpers';
import { isMobileOrTablet } from 'js/helpers/reactMediaQueries';
import { misc as i18n1 } from 'js/i18n/definitions';

const GuideMenuLink = ({
  title,
  anchorTag,
  isHeading,
  isCurrentSection,
  goToSection,
}) => {
  return (
    <div
      className={classNames('coa-GuideMenu__link-wrapper', {
        'coa-GuideMenu__current-section': isCurrentSection,
      })}
      id={`menu-${anchorTag}`}
    >
      <div
        className={classNames('coa-GuideMenu__link', {
          'coa-GuideMenu__heading': isHeading,
          'coa-GuideMenu__subheading': !isHeading,
          'coa-GuideMenu__current-section': isCurrentSection,
        })}
        onClick={e => goToSection(e, anchorTag)}
      >
        <span className="coa-GuideMenu__title-text">{title}</span>
      </div>
    </div>
  );
};

function GuideMenuSection({ section, currentSection, goToSection }) {
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
        goToSection={goToSection}
      />
      {subHeadings.map((subHeading, index) => (
        <GuideMenuLink
          key={index}
          title={subHeading.title}
          anchorTag={subHeading.anchorTag}
          isHeading={false}
          isCurrentSection={currentSection === subHeading.anchorTag}
          goToSection={goToSection}
        />
      ))}
    </div>
  );
}

const GuideMenu = ({
  contact,
  sections,
  currentSection,
  usingUrlAnchor,
  doneWithAnchor,
  intl,
}) => {
  const [clickedSection, setClickedSection] = useState(null);

  // Each GuideSectionWrapper has an id={this.props.anchorTag}
  const goToSection = (e, anchorTag) => {
    setClickedSection(anchorTag);
    history.pushState(null, null, `#${anchorTag}`);
    document.getElementById(anchorTag).scrollIntoView(true);
  };

  useEffect(() => {
    // debugger;
    if (usingUrlAnchor) {
      setClickedSection(currentSection);
      doneWithAnchor();
    }

    const el = document.getElementById(`menu-${currentSection}`);
    if (el) {
      if (clickedSection) {
        // If we clicked a section, we don't want to mess around with this logic
        // until we hit that section. This fires every time we scroll to a new
        // section, and is fired a bunch when the click fires off a scroll
        if (currentSection === clickedSection) {
          // We made it! back to business as usual
          setClickedSection(null);
        }
      } else {
        el.scrollIntoView(true);
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
            goToSection={goToSection}
          />
        )}
      </div>
      {sections.map((section, index) => (
        <GuideMenuSection
          key={index}
          section={section}
          currentSection={currentSection}
          goToSection={goToSection}
        />
      ))}
    </div>
  );
};

export default injectIntl(GuideMenu);
