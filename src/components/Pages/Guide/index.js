import React, { useState, useEffect, useReducer, useRef } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import Stickyfill from 'stickyfilljs';
import { findIndex, sortBy } from 'lodash';
import path from 'path';

import ContextualNav from 'components/PageSections/ContextualNav';
import GuideSectionWrapper from 'components/Pages/Guide/GuideSectionWrapper';
import GuideContactInformation from 'components/Pages/Guide/GuideContactInformation';
import GuideSectionCollection from 'components/Pages/Guide/GuideSectionCollection';
import PageBanner from 'components/PageBanner';
import GuideMenuMobile from 'components/Pages/Guide/GuideMenuMobile';
import GuideMenu from 'components/Pages/Guide/GuideMenu';
import { isMobileOrTabletQuery } from 'js/helpers/reactMediaQueries';
import { printSections } from './helpers';

function Guide(props) {
  const [currentSection, setCurrentSection] = useState(null);
  const [resizeCount, setResizeCount] = useState(0);
  const [sectionLocations, dispatchSectionLocations] = useReducer((sectionLocations, {action, payload})=>{
    switch (action) {
      case "update":
        const sectionIndex = findIndex(sectionLocations, {anchorTag: payload.anchorTag});
        if (sectionIndex === -1) {
          // Add a new value, then re-sort array by "offsetTop"
          return sortBy([...sectionLocations, payload], "offsetTop");
        } else {
          // update "offsetTop" for an existing sectionLocation
          return sectionLocations.map((sectionLocation, i)=>{
            return (i === sectionIndex) ? payload : sectionLocation;
          });
        }
      default:
        return sectionLocations
    }
  },[]);
  const isMobileOrTablet = isMobileOrTabletQuery();
  const node = useRef();

  // Update offsetTop of each GuideSection if the window resizes
  function updateSectionLocation(offsetTop, anchorTag) {
    return dispatchSectionLocations({
      action: "update",
      payload: { offsetTop, anchorTag }
    })
  }

  /**
    If the window's vertical distance from the top of the page (window.scrollY)
    is less than a GuideSection's vertical distance from the top of page (offsetTop)
    then we know that the window is positioned at the section right before that GuideSection.
    That's why we i-- at the end.
    We want the GuideSection right before the first GuideSection that is past the window's position.
  **/
  function handleScroll(){
    const thing = sectionLocations[0].offsetTop
    let i = 0;
    while (i < sectionLocations.length) {
      if (window.scrollY < (sectionLocations[i].offsetTop - 1)) {
        break;
      } else {
        i++
      }
    }
    i--;

    const nextCurrentSection = sectionLocations[i];
    if (nextCurrentSection) {
      setCurrentSection(nextCurrentSection.anchorTag)
    } else {
      setCurrentSection(null)
    }
  }
  useEffect(()=>{
    // update "scroll" listener when sectionLocations change
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sectionLocations])

  // Implement sticky polyfill for browsers that don't natively allow "position: sticky"
  // "position: sticky" will be used by GuideMenuSwitch child.
  useEffect(()=>{
    const stickyElements = node.current.querySelectorAll('.sticky');
    Stickyfill.add(stickyElements);
  },[])

  // Alert state when the window resizes.
  // This will tell the GuideSectionWrapper to update its sectionLocation
  // resizeCount is an arbitrary number. It just needs to change so that children know when to re-initiate a useEffect()
  function handleResize(){
    return setResizeCount(resizeCount + 1);
  }
  useEffect(()=>{
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  },[resizeCount])

  // Organize variables that will be used in rendering
  let {
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
    contacts,
  } = props.guidePage;
  let {intl} = props;

  let contact = null;
  if (contacts && contacts.edges && contacts.edges.length) {
    contact = contacts.edges[0].node.contact;
  }

  return (
    <div ref={node}>
      <Head>
        <title>{title}</title>
      </Head>
      <ContextualNav
        topic={topic}
        topics={topics}
        topiccollection={topic && topic.topiccollection}
        theme={theme}
        department={department}
        relatedDepartments={relatedDepartments}
      />
      {image && <PageBanner image={image}/>}
      <div className="coa-GuidePage-header">
        <h1>{title}</h1>
        {description && <p>{description}</p>}
      </div>
      <div className="coa-GuidePage__content-container">
        <div className="wrapper container-fluid">
          <div className="row">
            {isMobileOrTablet ? (
              <GuideMenuMobile
                title={title}
                contact={contact}
                sections={sections}
                currentSection={currentSection}
              />
            ) : (
              <div className="coa-GuideMenu__desktop-container sticky">
                <GuideMenu
                  contact={contact}
                  sections={sections}
                  currentSection={currentSection}
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
                {contact && <GuideContactInformation contact={contact}/>}
              </GuideSectionWrapper>
              {sections.map((section, index) => (
                <GuideSectionCollection
                  key={index}
                  section={section}
                  updateSectionLocation={updateSectionLocation}
                  isMobileOrTablet={isMobileOrTablet}
                  resizeCount={resizeCount}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouteData(injectIntl(Guide));
