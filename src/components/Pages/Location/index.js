import React from 'react';
import { useRouteData, Head } from 'react-static';
import { injectIntl } from 'react-intl';

import PageHeader from 'components/PageHeader';

import "components/Pages/Location/_Location.scss";

const LocationPage = ({ locationPage, intl }) => {
  const {
    locationPage: {
      title,
      contact: {
        phone,
        email,
        location,
        image,
        hours,
      },
      services,
    }
  } = locationPage ? { locationPage } : useRouteData();

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="coa-Page__all-of-the-content coa-LocationPage__content-container">
        <div className="coa-LocationPage__header">
          <i class="material-icons coa-LocationPage__header-icon">where_to_vote</i>
          <h1 className="coa-LocationPage__header-title">
            {title}
          </h1>
        </div>
        <div className="coa-LocationPage__section">
          <div className="coa-LocationPage__sub-section">
            <h2 className="coa-LocationPage__sub-section-title">
              Contact
            </h2>
            <div className="coa-LocationPage__sub-section-block-container">
              <div className="coa-LocationPage__sub-section-block">
                <div className="coa-LocationPage__sub-section-block-title">
                  Phone
                </div>
                <div className="coa-LocationPage__sub-section-block-contents">
                  {`${phone.name}: ${phone.value}`}
                </div>
              </div>
              <div className="coa-LocationPage__sub-section-block">
                <div className="coa-LocationPage__sub-section-block-title">
                  Email Address
                </div>
              </div>
            </div>
          </div>
          <div className="coa-LocationPage__sub-section">
            <h2 className="coa-LocationPage__sub-section-title">
              Location
            </h2>
            Location info
          </div>
          <div className="coa-LocationPage__sub-section">
            <h2 className="coa-LocationPage__sub-section-title">
              Facility Hours
            </h2>
            Them hours
          </div>
        </div>
        <div className="coa-LocationPage__section">
          <h2 className="coa-LocationPage__sub-section-title">
            Services offered
          </h2>
        </div>
        <div className="coa-LocationPage__section">
          <h2 className="coa-LocationPage__sub-section-title">
            Getting here
          </h2>
        </div>
      </div>
    </div>
  )
}

export default injectIntl(LocationPage);
