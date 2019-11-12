import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const themesData = {
  en: [
    {
      text: 'Permits and tickets',
    },
    {
      text: 'Housing and utilities',
    },
    {
      text: 'Pets',
    },
    {
      text: 'Health and safety',
    },
    {
      text: 'Explore and visit',
    },
    {
      text: 'Government and business',
    },
    {
      text: 'Jobs',
    },
  ],
  es: [
    {
      text: 'Permisos y multas',
    },
    {
      text: 'Vivienda y servicios públicos',
    },
    {
      text: 'Mascotas',
    },
    {
      text: 'Salud y seguridad',
    },
    {
      text: 'Explorar y visitar',
    },
    {
      text: 'Gobierno y negocios',
    },
    {
      text: 'Empleos',
    },
  ],
  vi: [
    {
      text: 'Giấy phép & Giấy phạt',
    },
    {
      text: 'Nhà ở & Tiện ích',
    },
    {
      text: 'Thú vật nuôi',
    },
    {
      text: 'Sức khỏe $ An toàn',
    },
    {
      text: 'Khám phá $ Thăm viếng',
    },
    {
      text: 'Chính phủ $ Doanh nghiệp',
    },
    {
      text: 'Công việc',
    },
  ],
  ar: [
    {
      text: 'التصاريح والتذاكر',
    },
    {
      text: 'الإسكان والمنافع',
    },
    {
      text: 'لحيوانات الأليفة',
    },
    {
      text: 'الصحة والسلامة',
    },
    {
      text: 'الاستكشاف والزيارة',
    },
    {
      text: 'الحكومة والأعمال',
    },
    {
      text: 'الوظائف',
    },
  ],
};

const ThemesNav = props => (
  <nav className={classNames('coa-ThemesNav', { 'coa-ThemesNav--open': props.isTopMenuActive } )}>
    <ul className="coa-ThemesNav__list">
      {themesData[props.intl.locale].map((theme, index) => (
        <li className="coa-ThemesNav__theme" key={index} tabIndex="0" onKeyDown={props.handleOnClick}>
          <a className="coa-ThemesNav__link" onClick={props.handleOnClick} >
            {theme.text}
          </a>
        </li>
      ))}
    </ul>
    {props.isTopMenuActive ? (
      <a
        className="coa-FullSiteMenu__close"
        tabIndex="0"
        onClick={props.handleFullSiteMenuClose}
        onKeyDown={props.handleFullSiteMenuClose}
      >
        <i className="material-icons">close</i>
      </a>
    ) : null}
  </nav>
);

ThemesNav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default injectIntl(ThemesNav);
