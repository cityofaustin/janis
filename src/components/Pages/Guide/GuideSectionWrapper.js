import React, { useEffect, useRef } from 'react';

/**
  Wrapper to create an id for the GuideSidebar's anchorTag to link to.
  Also creates a ref to pass to parent index.js.
  This ref contains information about the rendered component's position.
  We pass the ref's offsetTop to the parent so that the sidebar can know which section is being looked at (based on scrolling behavior).
**/
function GuideSectionWrapper(props) {
  const node = useRef();

  const {
    anchorTag,
    updateSectionLocation,
    isMobileOrTablet,
    resizeCount,
    children
  } = props;

  // updateSectionLocation if the window resized or Mobile status changed
  useEffect(()=>{
    updateSectionLocation(node.current.offsetTop, anchorTag);
  }, [isMobileOrTablet, resizeCount])

  return (
    <div
      id={anchorTag}
      ref={node}
    >
      {children}
    </div>
  )
}

export default GuideSectionWrapper;
