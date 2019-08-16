import React, { Component } from 'react';
import { withRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';
import ReactDOM from 'react-dom';
import Stickyfill from 'stickyfilljs';

import ContextualNav from 'components/PageSections/ContextualNav';
import GuideSection from 'components/Pages/Guide/GuideSection';
import GuideBannerImage from 'components/Pages/Guide/GuideBannerImage';
import Phone from 'components/Contact/Phone';
import Email from 'components/Contact/Email';

// TODO: make this not break with broken data

class Guide extends Component {
  // Implement sticky polyfill for browsers that don't natively allow {position: sticky}
  componentDidMount(){
    const node = ReactDOM.findDOMNode(this); // Prefer React.createRef() in v16.3.0+

    const stickyElements = node.querySelectorAll('.sticky');
    Stickyfill.add(stickyElements);
  }

  render() {
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
    } = this.props.guidePage;
    let {intl} = this.props;

    let contact = null;
    if (contacts && contacts.edges && contacts.edges.length) {
      contact = contacts.edges[0].node.contact;
    }

    let phone = null;
    if (contact && contact.phone) {
      phone = JSON.parse(contact.phone);
    }

    return (
      <div>
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
        <div>
          <div className="wrapper container-fluid">
            <GuideBannerImage image={image} />
          </div>
          <div className="coa-GuidePage-header--container">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="coa-GuidePage__content-container">
            <div className="wrapper container-fluid">
              <div className="row">
                <div className="coa-GuidePage__nav-sidebar sticky">
                  Coming Soon
                </div>
                <div className="coa-GuidePage__main-content">
                  <h1>Contact Information</h1>
                  <div className="coa-GuidePage__contact-block row">
                    <div className="coa-GuidePage__contact-block-name col-md-6">
                      <h2>{contact.name}</h2>
                    </div>
                    <div className="coa-GuidePage__contact-block-info col-md-6">
                      <div className="coa-GuidePage__contact-block-phone">
                        <Phone phone={phone} />
                      </div>
                      <div className="coa-GuidePage__contact-block-email">
                        <Email email={contact.email} />
                      </div>
                    </div>
                  </div>
                  {sections.map((section, index) => (
                    <GuideSection section={section} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withRouteData(injectIntl(Guide));
