const LocationPageBlock = ({title, content}) => (
  <div className="coa-LocationPage__sub-section-block">
    <div className="coa-LocationPage__sub-section-block-title">
      {title}
    </div>
    <div className="coa-LocationPage__sub-section-block-contents">
      {content}
    </div>
  </div>
);

export const LocationPageContact = ({phone, email}) => {
  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        Contact
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <LocationPageBlock
          title="Phone"
          content={{}}
        />
        <LocationPageBlock
          title="Email Address"
          content={{}}
        />
      </div>
    </div>
  );
}

export const LocationPageLocation = ({location, image}) => {
  return (
    <div className="coa-LocationPage__sub-section">
      <h2 className="coa-LocationPage__sub-section-title">
        Location
      </h2>
      <div className="coa-LocationPage__sub-section-block-container">
        <LocationPageBlock
          title="Physical Address"
          content={{}}
        />
        <LocationPageBlock
          title="Mailing Address"
          content={{}}
        />
      </div>
      <img/>
    </div>
  );
}



export const LocationPageSubSection = ({title, children}) => {
  <div className="coa-LocationPage__sub-section">
    <h2 className="coa-LocationPage__sub-section-title">
      {title}
    </h2>
    {children}
  </div>
}

export const LocationPageSubSectionBlockContainer = ({title, children}) => {
  <div className="coa-LocationPage__sub-section">
    <h2 className="coa-LocationPage__sub-section-title">
      {title}
    </h2>
    {children}
  </div>
}
