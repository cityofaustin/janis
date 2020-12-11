import React from 'react';
import { useIntl } from 'react-intl';
import { alert as i18n1 } from 'js/i18n/definitions';
import ExternalLink from 'components/ExternalLink';
import LocationsCOVID_19 from 'components/Alerts/locationsCOVID_19.js';

const Alert = ({ badge, content, link, description }) => {
  const styleWithContent = content ? "textContent" : ""
  const intl = useIntl();

  return (
    <div>
    <div className={"coa-HomepageAlert__container "+styleWithContent}>
      <div className={"coa-HomepageAlert__content "+styleWithContent}>
        <div className="coa-HomepageAlert__label">
          <div className="coa-HomepageAlert__label--icon">
            <i className="material-icons">
              error_outline
            </i>
          </div>
          <span className="coa-HomepageAlert__label--text">
            {badge}
          </span>
        </div>
        { 
        !styleWithContent && (
        <div className="coa-HomepageAlert__link">
          <span className="coa-HomepageAlert__description"> {description} </span>
          <a
            href={link}
            className="coa-HomepageAlert__link-external"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>{intl.formatMessage(i18n1.readMore)}</span>
            <i className="material-icons coa-HomepageAlert__link-icon">
              open_in_new
            </i>
          </a>
        </div>
        )}
      </div>
    </div>
          { (content == "locationsCOVID_19") && (
        <div className="coa-HomepageAlert__label--text-content">
          <LocationsCOVID_19
            description={description}
          />
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
