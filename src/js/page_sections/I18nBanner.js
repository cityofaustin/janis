import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { SUPPORTED_LANGUAGES, SUPPORTED_LANG_CODES } from 'js/constants/languages'
import CaretDownSVG from 'js/svg/CaretDown';
import CaretUpSVG from 'js/svg/CaretUp';


class I18nBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  getBannerClassName = () => {
    const baseClass = 'coa-I18nBanner';
    return `${baseClass} ${this.state.isOpen ? `${baseClass}--open` : ''}`;
  }

  getPathname = () => {
    let pathArray = this.props.location.pathname.split('/').filter(n => n);
    if (SUPPORTED_LANG_CODES.includes(pathArray[0])){
      pathArray.splice(0, 1)
    }
    return pathArray.join('/');
  }

  getLanguageItemClassName = (language) => {
    const blockElementClassname = `coa-I18nBanner__language-item`;
    let classNames = blockElementClassname;

    if (language.code === this.props.activeLanguage) {
      classNames = classNames + ` ${blockElementClassname}--active`;
    }

    return classNames;
  }

  getMenuClassName = () => {
    const base = `coa-I18nBanner__dropdown-menu`;

    return this.state.isOpen ? `${base} ${base}--open` : `${base} ${base}--closed`;
  }

  handleSetLanguage = (e) => {
    if (e.target.lang) {
      this.props.handleManualLanguageUpdate(e.target.lang);
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
    let activeLanguage = SUPPORTED_LANGUAGES.find((lang) => {
      return lang.code === this.props.activeLanguage;
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
              <div className="coa-I18nBanner__choose-language"
                onClick={this.handleExpandMenu}
              >
                <span>Choose Language
                  <span className="coa-link coa-I18nBanner__choose-language-link">
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
                    <h4 className="coa-I18nBanner__menu-header">
                      Translated by City of Austin
                    </h4>
                    <ul className="coa-I18nBanner__language-list">
                      { SUPPORTED_LANGUAGES.map((language, i) => {
                        return (
                          <li onClick={this.handleSetLanguage}
                            className={this.getLanguageItemClassName(language)}
                            key={i}
                          >
                            <Link to={`/${language.code}/${this.getPathname()}`}
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
                <p className="link coa-I18nBanner__cancel"
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

export default I18nBanner;
