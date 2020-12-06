import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';
import ExternalLink from 'components/ExternalLink';
import LocationsCOVID_19 from 'components/Alerts/locationsCOVID_19.js';

const Alert = ({ badge, content, link, linkContent }) => {
  const styleWithContent = content ? "textContent" : ""
  const intl = useIntl();

  return (
    <div className={"coa-HomepageAlert__container "+styleWithContent}>
      <div className="coa-HomepageAlert__content">
        <div className="coa-HomepageAlert__label">
          <div className="coa-HomepageAlert__label--icon">
            <i className="material-icons">
              error_outline
            </i>
          </div>
          <span className="coa-HomepageAlert__label--text"> {badge} </span>
        </div>
        <div className="coa-HomepageAlert__link">
        { !styleWithContent && (
          <a
            href={link}
            className="coa-HomepageAlert__link-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkContent}
            <i className="material-icons coa-HomepageAlert__link-icon">open_in_new</i>
          </a>
        )}
        </div>
      </div>
      { (content == "locationsCOVID_19") && (
        <div className="coa-HomepageAlert__label--text-content">
          <LocationsCOVID_19 />
        </div>
      )}
    </div>
  )
};


export default Alert;


/*
element.style {
    display: inline;
    top: 10px;
    position: relative;
    left: 10px;
}*/
