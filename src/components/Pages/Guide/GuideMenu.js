import React, { Component, useRef, useEffect } from 'react';
import { injectIntl } from 'react-intl';

import classNames from 'classnames';
import { hyphenate } from './helpers';
import { useDesktopQuery } from 'js/helpers/reactMediaQueries';
import { misc as i18n1 } from 'js/i18n/definitions';

function GuideMenuLink({ title, anchorTag, isHeading, isCurrentSection, scrollGuideMenu, handleSectionClick, clickedSection }) {
  // Each GuideSectionWrapper has an id={this.props.anchorTag}
  const node = useRef();
  const isDesktop = useDesktopQuery();

  /*
    Check if we need to scroll the GuideMenu.
    But only do that if we aren't presently scrolling to a clickedSection.
    We want to scroll the GuideMenu sidebar only if the main content is done scrolling.
    Otherwise the GuideMenu would get stuck on its way to the clickedSection.
  */
  useEffect(() => {
    if (isCurrentSection && isDesktop && !clickedSection) {
      scrollGuideMenu(anchorTag, node.current.getBoundingClientRect())
    }
  }, [clickedSection, isCurrentSection, isDesktop])

  function handleClick(e) {
    handleSectionClick(anchorTag);
  }

  return (
    <div
      className={classNames('coa-GuideMenu__link-wrapper', {
        'coa-GuideMenu__current-section': isCurrentSection,
      })}
      ref={node}
    >
      <div
        className={classNames('coa-GuideMenu__link', {
          'coa-GuideMenu__heading': isHeading,
          'coa-GuideMenu__subheading': !isHeading,
          'coa-GuideMenu__current-section': isCurrentSection,
        })}
        onClick={handleClick}
      >
        <span className="coa-GuideMenu__title-text">{title}</span>
      </div>
    </div>
  );
}

function GuideMenuSection({ section, currentSection, scrollGuideMenu, handleSectionClick, clickedSection }) {
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
        scrollGuideMenu={scrollGuideMenu}
        handleSectionClick={handleSectionClick}
        clickedSection={clickedSection}
      />
      {subHeadings.map((subHeading, index) => (
        <GuideMenuLink
          key={index}
          title={subHeading.title}
          anchorTag={subHeading.anchorTag}
          isHeading={false}
          isCurrentSection={currentSection === subHeading.anchorTag}
          scrollGuideMenu={scrollGuideMenu}
          handleSectionClick={handleSectionClick}
          clickedSection={clickedSection}
        />
      ))}
    </div>
  );
}

function GuideMenu({ contact, sections, currentSection, intl, scrollGuideMenu, handleSectionClick, clickedSection }) {
  return (
    <div>
      <div className="coa-GuideMenu__section">
        {contact && (
          <GuideMenuLink
            title={intl.formatMessage(i18n1.contactInformation)}
            anchorTag="Contact-information"
            isHeading={true}
            isCurrentSection={currentSection === 'Contact-information'}
            scrollGuideMenu={scrollGuideMenu}
            handleSectionClick={handleSectionClick}
            clickedSection={clickedSection}
          />
        )}
      </div>
      {sections.map((section, index) => {
        return (
          <div>
            <GuideMenuSection
              key={index}
              section={section}
              currentSection={currentSection}
              scrollGuideMenu={scrollGuideMenu}
              handleSectionClick={handleSectionClick}
              clickedSection={clickedSection}
            />
          </div>
        )
      })}
    </div>
  );
}

export default injectIntl(GuideMenu);
