import React, { Component, useEffect, useState } from 'react';
import { injectIntl } from 'react-intl';

import classNames from 'classnames';
import { hyphenate } from './helpers';
import { isMobileOrTablet } from 'js/helpers/reactMediaQueries';
import { misc as i18n1 } from 'js/i18n/definitions';
import scrollIntoView from 'scroll-into-view';

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
    // scrollIntoView(document.getElementById(anchorTag));
    // scrollIntoView(document.getElementById(anchorTag), { cancellable: false });
    document.getElementById(anchorTag).scrollIntoView(true);
  };

  useEffect(() => {
    // If we're loading in an anchor url, we treat it as if we
    // clicked on it, then let the rest of changes happen
    // if we've already set a clickedSection, we shouldn't set it again
    if (usingUrlAnchor && !clickedSection) {
      // debugger;
      setClickedSection(currentSection);
      scrollIntoView(
        document.getElementById(`menu-${currentSection}`),
        function(type) {
          // Scrolling done.
          // type will be 'complete' if the scroll completed or 'canceled' if the current scroll was canceled by a new scroll
          scrollIntoView(document.getElementById(currentSection), function(
            type,
          ) {
            // debugger;
            doneWithAnchor();
            // return;
          });
        },
      );
      return;
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
        // scrollIntoView(el);
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
