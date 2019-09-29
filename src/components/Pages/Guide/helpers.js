// Replace whitespace with hyphens for anchor tags
export const hyphenate = (title) => title.replace(/\s/g, "-")

// useful for debugging the sidebar
export const printSections = (sectionLocations, pageYOffset) => {
  console.log("-----------------------------------------")
  let gotY = false;
  for (let i in sectionLocations) {
    let section = sectionLocations[i];
    if (!gotY && (pageYOffset < (section.offsetTop - 1))) {
      gotY = true;
      console.log("|")
      console.log(`x <---- we are here at ${pageYOffset}`);
      console.log ("|")
    } else {
      console.log ("|")
    }
    console.log(`${section.offsetTop} ------ ${section.anchorTag}`)
  }
  if (!gotY) {
    console.log ("|")
    console.log(`x <---- we are here at ${pageYOffset}`);
    console.log ("|")
  } else {
    console.log ("|")
  }
}
