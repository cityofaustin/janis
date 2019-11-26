import React, { useState, useEffect, useReducer, useRef } from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import { find, findIndex, sortBy } from 'lodash';
import { misc as i18n } from 'js/i18n/definitions';
import path from 'path';

import ContextualNav from 'components/PageSections/ContextualNav';
import GuideSectionWrapper from 'components/Pages/Guide/GuideSectionWrapper';
import GuideContactInformation from 'components/Pages/Guide/GuideContactInformation';
import GuideSectionCollection from 'components/Pages/Guide/GuideSectionCollection';
import PageBanner from 'components/PageBanner';
import GuideMenuMobile from 'components/Pages/Guide/GuideMenuMobile';
import GuideMenu from 'components/Pages/Guide/GuideMenu';
import { useMobileOrTabletQuery } from 'js/helpers/reactMediaQueries';
import { printSections } from 'components/Pages/Guide/helpers.js';
import { hyphenate } from './helpers';

import guidePagePlaceholder from 'images/guide_page_placeholder.png';

function Guide({ guidePage, intl }) {
  const {
    guidePage: {
      id,
      title,
      description,
      slug,
      topic,
      topics,
      theme,
      department,
      relatedDepartments,
      sections,
      image,
      contact,
      coaGlobal,
      contextualNavData,
    },
  } = guidePage ? { guidePage } : useRouteData();
  const isMobileOrTablet = useMobileOrTabletQuery();
  const rootNode = useRef();
  const desktopGuideMenuNode = useRef();
  const [resizeCount, setResizeCount] = useState(0);
  const [sectionLocations, dispatchSectionLocations] = useReducer(
    // payload for each sectionLocation contains {node: useRef(), offsetTop, anchorTag}
    (sectionLocations, { action, payload }) => {
      switch (action) {
        case 'update':
          const sectionIndex = findIndex(sectionLocations, {
            anchorTag: payload.anchorTag,
          });
          return sectionLocations.map((sectionLocation, i) => {
            return i === sectionIndex ? payload : sectionLocation;
          });
        default:
          return sectionLocations;
      }
    },
    null,
    () => {
      /*
        Initially just set anchorTags for sectionLocations.
        After rendering, the components themselves will update sectionLocations
        to include their node from useRef() and their offsetTop.
      */
      const sectionLocations = [
        {anchorTag: "Contact-information"}
      ];
      sections.forEach(section => {
        const heading = hyphenate(section.heading)
        sectionLocations.push({
          anchorTag: heading,
        });
        section.pages.forEach((page, index)=>{
          sectionLocations.push({
            anchorTag: `${heading}-${index + 1}`
          });
        });
      });
      return sectionLocations
    },
  );
  const [currentSection, setCurrentSection] = useState(()=>{
    // If there is a #hash in the URL, set the currentSection to that.
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash) {
        // Remove leading '#'
        const initialCurrectSection = hash.slice(1);
        // if the /#hash in the url refers to a real section, then set that to the initial currentSection
        console.log(`~~~~ Should be our initialCurrectSection ${initialCurrectSection}`)
        console.log(`~~~ you sectionLocations`, sectionLocations)
        if (find(sectionLocations, ["anchorTag", initialCurrectSection])) {
          console.log(`~~~~~ yep its good`)
          return initialCurrectSection;
        }
      }
    }
    console.log("~~~~ there is no initialCurrectSection")
    return null;
  });
  const [clickedSection, setClickedSection] = useState(null);

  // Navigate to guideSection when its been clicked on in GuideMenu.
  useEffect(()=>{
    if (clickedSection) {
      history.pushState(null, null, `#${clickedSection}`);
      const guideSection = find(sectionLocations, ["anchorTag", clickedSection])
      if (guideSection) {
        guideSection.node.current.scrollIntoView(true);
      } else {
        setClickedSection(null)
      }
    }
  }, [clickedSection, sectionLocations])

  // Reset clickedSection once we've scrolled to it
  useEffect(()=>{
    if (currentSection === clickedSection) {
      setClickedSection(null);
    }
  }, [clickedSection, currentSection])

  // Update offsetTop of each GuideSection if the window resizes
  function updateSectionLocation(node, anchorTag) {
    return dispatchSectionLocations({
      action: 'update',
      payload: {
        node,
        offsetTop: node.current.offsetTop,
        anchorTag
      },
    });
  }

  /**
    If the window's vertical distance from the top of the page (window.scrollY)
    is less than a GuideSection's vertical distance from the top of page (offsetTop)
    then we know that the window is positioned at the section right before that GuideSection.
    That's why we i-- at the end.
    We want the GuideSection right before the first GuideSection that is past the window's position.
  **/
  function handleScroll() {
    console.log("~~~~ a scroll event, now at:", window.pageYOffset)
    console.log("~~~~ scrolly sectionLocations:", sectionLocations)
    // printSections(sectionLocations, window.pageYOffset)
    let i = 0;
    while (i < sectionLocations.length) {
      if (window.pageYOffset < sectionLocations[i].offsetTop - 1) {
        break;
      } else {
        i++;
      }
    }
    i--;
    const nextCurrentSection = sectionLocations[i];
    if (nextCurrentSection) {
      setCurrentSection(nextCurrentSection.anchorTag);
    } else {
      setCurrentSection(null);
    }
  }
  useEffect(() => {
    // update "scroll" listener when sectionLocations change
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionLocations]);

  // Implement sticky polyfill for browsers that don't natively allow "position: sticky"
  // "position: sticky" will be used by desktop GuideMenu.
  useEffect(() => {
    const stickyElements = rootNode.current.querySelectorAll('.sticky');

    // stickyfill breaks the build with a 'window is not defined' error
    // see https://github.com/react-static/react-static/issues/16
    // see https://github.com/wilddeer/stickyfill/issues/99
    if (typeof window !== 'undefined' && typeof Stickyfill == 'undefined') {
      var Stickyfill = require('stickyfilljs');
    }

    if (typeof Stickyfill !== 'undefined') {
      Stickyfill.add(stickyElements);
    }
  }, []);

  // Alert state when the window resizes.
  // This will tell the GuideSectionWrapper to update its sectionLocation
  // resizeCount is an arbitrary number. It just needs to change so that children know when to re-initiate a useEffect()
  function handleResize() {
    return setResizeCount(resizeCount + 1);
  }
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [resizeCount]);

  // Scroll the guideMenu if the currentSection's Link is not visible
  function scrollGuideMenu(anchorTag, currentSectionLinkRect) {
    const guideMenuRect = desktopGuideMenuNode.current.getBoundingClientRect();
    const guideMenuBottom = guideMenuRect.bottom;
    const guideMenuTop = guideMenuRect.top;
    const guideMenuScrollTop = desktopGuideMenuNode.current.scrollTop;
    const currentSectionLinkBottom = currentSectionLinkRect.bottom;
    const currentSectionLinkTop = currentSectionLinkRect.top;
    if (currentSectionLinkBottom > guideMenuBottom) {
      /*
        If the bottom of the currentSection GuideMenuLink is below the bottom of the GuideMenu,
        Then move the GuideMenu down.
      */
      desktopGuideMenuNode.current.scrollTop = (currentSectionLinkBottom - guideMenuBottom + guideMenuScrollTop);
    } else if (currentSectionLinkTop < guideMenuTop) {
      /*
        If the top of the currentSection GuideMenuLink is above the top of the GuideMenu,
        Then move the GuideMenu up.
      */
      desktopGuideMenuNode.current.scrollTop = (guideMenuScrollTop + currentSectionLinkTop);
    }
  }

  return (
    <div ref={rootNode}>
      <Head>
        <title>{title}</title>
      </Head>
      {!coaGlobal && (
        <ContextualNav
          parent={contextualNavData.parent}
          relatedTo={contextualNavData.relatedTo}
          offeredBy={contextualNavData.offeredBy}
        />
      )}

      {image && <PageBanner image={image} />}

      {!image && (
        <img
          className="coa-GuidePage__guide-page-placeholder"
          src={guidePagePlaceholder}
          alt={intl.formatMessage(i18n.guidePagePlaceholder)}
        />
      )}

      <div className="coa-GuidePage__header">
        <h1 className="coa-GuidePage__header-title">{title}</h1>
        {description && (
          <div className="coa-GuidePage__header-description-container">
            <p className="coa-GuidePage__header-description">{description}</p>
          </div>
        )}
      </div>
      <div className="coa-GuidePage__content-container">
        <div className="wrapper">
          <div className="row">
            {isMobileOrTablet ? (
              <GuideMenuMobile
                title={title}
                contact={contact}
                sections={sections}
                currentSection={currentSection}
                scrollGuideMenu={scrollGuideMenu}
                setClickedSection={setClickedSection}
                clickedSection={clickedSection}
              />
            ) : (
              <div ref={desktopGuideMenuNode} className="coa-GuideMenu__desktop-container sticky">
                <GuideMenu
                  contact={contact}
                  sections={sections}
                  currentSection={currentSection}
                  scrollGuideMenu={scrollGuideMenu}
                  setClickedSection={setClickedSection}
                  clickedSection={clickedSection}
                />
              </div>
            )}
            <div className="coa-GuidePage__main-content">
              <GuideSectionWrapper
                anchorTag="Contact-information"
                updateSectionLocation={updateSectionLocation}
                isMobileOrTablet={isMobileOrTablet}
                resizeCount={resizeCount}
              >
                {contact && <GuideContactInformation contact={contact} />}
              </GuideSectionWrapper>
              {sections.map((section, index) => (
                <GuideSectionCollection
                  key={index}
                  section={section}
                  updateSectionLocation={updateSectionLocation}
                  isMobileOrTablet={isMobileOrTablet}
                  resizeCount={resizeCount}
                  intl={intl}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default injectIntl(Guide);
