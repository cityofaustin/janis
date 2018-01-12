import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { SUPPORTED_LANGUAGES, SUPPORTED_LANG_CODES } from 'js/constants/languages'
import CaretDownSVG from 'js/svg/CaretDown';


class I18nBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  getPathname = () => {
    let pathArray = this.props.location.pathname.split('/').filter(n => n)
    if (SUPPORTED_LANG_CODES.includes(pathArray[0])){
      pathArray.splice(0, 1)
    }

    return pathArray.join('/')
  }

  getLanguageMenuClassName = (language) => {
    const classNameBase = `coa-I18nBanner__language`;
    return language.code === this.props.activeLanguage
             ? `${classNameBase}--active`
             : ''
  }

  getMenuClassName = () => {
    const base = `coa-I18nBanner__other-language-options`;
    return this.state.isOpen ? `${base}--open` : `${base}--closed`;
  }

  handleSetLanguage = (e) => {
    if (e.target.lang) {
      this.props.handleManualLanguageUpdate(e.target.lang)
      this.setState({
        isOpen: false,
      })
    }
  }

  handleExpandMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  getActiveLanguageTitle = () => {
    const activeLanguage = SUPPORTED_LANGUAGES.find((lang) => {
      return lang.code === this.props.activeLanguage;
    });
    return activeLanguage.title;
  }

  handleCancel = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {
    const languageTitle = this.getActiveLanguageTitle();

    return (
      <div className={`coa-I18nBanner ${this.state.isOpen ? 'coa-I18nBanner--open' : ''}`}>
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="coa-I18nBanner__language-list">
                {
                  <span className="coa-I18nBanner__language coa-I18nBanner__language--other"
                    onClick={this.handleExpandMenu}
                  >
                    <span>Choose Language
                      <span className="link coa-I18nBanner__choose-language">
                        {languageTitle}
                      </span>
                    </span>
                    <CaretDownSVG size="20"/>
                    <div className={this.getMenuClassName()}>
                      <div className="wrapper">
                        <h4>Translated by City of Austin</h4>
                        <ul>
                          { SUPPORTED_LANGUAGES.map((language, i) => {
                            return (
                              <li onClick={this.handleSetLanguage}
                                className={this.getLanguageMenuClassName(language)}
                                key={i}
                                >
                                <Link to={`/${language.code}/${this.getPathname()}`} lang={language.code}>
                                  {language.title}
                                </Link>
                              </li>
                            )
                          })
                        }
                      </ul>
                    </div>
                    <p className="link coa-I18nBanner__cancel" onClick={this.handleCancel}>Cancel</p>
                    </div>
                  </span>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default I18nBanner;
