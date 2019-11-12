import React from 'react';
import { injectIntl } from 'react-intl';
import PropTypes from 'prop-types';
import classNames from 'classnames';

const themesData = {
  en: [
    'Permits and tickets',
    'Housing and utilities',
    'Pets',
    'Health and safety',
    'Explore and visit',
    'Government and business',
    'Jobs'
  ],
  es: [
    'Permisos y multas',
    'Vivienda y servicios públicos',
    'Mascotas',
    'Salud y seguridad',
    'Explorar y visitar',
    'Gobierno y negocios',
    'Empleos'
  ],
  vi: [
    'Giấy phép & Giấy phạt',
    'Nhà ở & Tiện ích',
    'Thú vật nuôi',
    'Sức khỏe $ An toàn',
    'Khám phá $ Thăm viếng',
    'Chính phủ $ Doanh nghiệp',
    'Công việc'
  ],
  ar: [
    'التصاريح والتذاكر',
    'الإسكان والمنافع',
    'لحيوانات الأليفة',
    'الصحة والسلامة',
    'الاستكشاف والزيارة',
    'الحكومة والأعمال',
    'الوظائف'
  ],
};

const ThemesNav = props => { console.log(themesData);
 return (
  <nav className={classNames('coa-ThemesNav', { 'coa-ThemesNav--open': props.isTopMenuActive } )}>
    <ul className="coa-ThemesNav__list">
      {themesData[props.intl.locale].map((theme, index) => (
        <li className="coa-ThemesNav__theme" key={index} tabIndex="0" onKeyDown={props.handleOnClick}>
          <a className="coa-ThemesNav__link" onClick={props.handleOnClick} >
            {theme}
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
)};

ThemesNav.propTypes = {
  handleOnClick: PropTypes.func.isRequired,
};

export default injectIntl(ThemesNav);
