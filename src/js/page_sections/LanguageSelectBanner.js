import React, { Component } from 'react';
import { Link } from 'react-static';
import Cookies from 'js-cookie'

import { SUPPORTED_LANGUAGES, SUPPORTED_LANG_CODES } from 'js/constants/languages'
import CaretDownSVG from 'js/svg/CaretDown';
import CaretUpSVG from 'js/svg/CaretUp';
import { getPathnameWithoutLangCode } from 'js/helpers/language';

class LanguageSelectBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  getBannerClassName = () => {
    const baseClass = 'coa-LanguageSelectBanner';
    return `${baseClass} ${this.state.isOpen ? `${baseClass}--open` : ''}`;
  }

  getLanguageItemClassName = (language) => {
    const blockElementClassname = `coa-LanguageSelectBanner__language-item`;
    let classNames = blockElementClassname;

    if (language.code === this.props.match.params.lang) {
      classNames = classNames + ` ${blockElementClassname}--active`;
    }

    return classNames;
  }

  getMenuClassName = () => {
    const base = `coa-LanguageSelectBanner__dropdown-menu`;

    return this.state.isOpen ? `${base} ${base}--open` : `${base} ${base}--closed`;
  }

  handleSetLanguage = (e) => {
    if (e.target.lang) {
      this.props.updateLanguage(e.target.lang)
      this.setState({
        isOpen: false,
      });
    }
  }

  handleExpandMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  getActiveLanguageTitle = () => {
    const setLanguage = Cookies.get('lang') || this.props.match.params.lang;
    let activeLanguage = SUPPORTED_LANGUAGES.find((lang) => {
      return lang.code === setLanguage;
    });
    activeLanguage = activeLanguage || SUPPORTED_LANGUAGES[0];
    return activeLanguage.title;
  }

  handleCancel = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    const languageTitle = this.getActiveLanguageTitle();

    return (
      <div className={this.getBannerClassName()}>
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="coa-LanguageSelectBanner__choose-language"
                onClick={this.handleExpandMenu}
              >
                <span>Choose Language
                  <span className="coa-link coa-LanguageSelectBanner__choose-language-link">
                    {languageTitle}
                  </span>
                </span>
                {
                  this.state.isOpen ?
                    <CaretUpSVG size="20"/> :
                    <CaretDownSVG size="20"/>
                }
                <div className={this.getMenuClassName()}>
                  <div className="wrapper">
                    <h4 className="coa-LanguageSelectBanner__menu-header">
                      Translated by City of Austin
                    </h4>
                    <ul className="coa-LanguageSelectBanner__language-list">
                      { SUPPORTED_LANGUAGES.map((language, i) => {
                        return (
                          <li onClick={this.handleSetLanguage}
                            className={this.getLanguageItemClassName(language)}
                            key={i}
                          >
                            <Link
                              to={`/${language.code}/${getPathnameWithoutLangCode(this.props.location.pathname)}`}
                              lang={language.code}
                            >
                              {language.title}
                            </Link>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <p className="coa-link coa-LanguageSelectBanner__cancel"
                  onClick={this.handleCancel}
                >
                  Cancel
                </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default LanguageSelectBanner;
