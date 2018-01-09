import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import SUPPORTED_LANGUAGES from 'js/constants/languages'
import CaretDownSVG from 'js/svg/CaretDown';


class I18nBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
    this.displayedLanguageAmount = 4;
    this.visibleLanguageOptions = SUPPORTED_LANGUAGES.slice(0, this.displayedLanguageAmount);
    this.secondaryLanguageOptions = SUPPORTED_LANGUAGES.slice(this.displayedLanguageAmount, SUPPORTED_LANGUAGES.length);
    console.log(this.getPathname())
  }

  getPathname = () => {
    let pathArray = this.props.location.pathname.split('/').filter(n => n)
    if (SUPPORTED_LANGUAGES.map(lang => lang.code).includes(pathArray[0])){
      pathArray.splice(0, 1)
    }

    return pathArray.join('/')
  }

  getLanguageMenuClassName = (language) => {
    const classNameBase = `coa-I18nBanner__language`;
    return language.code === this.props.activeLanguage.substring(0,2)
             ? `${classNameBase}--active`
             : ''
  }

  getSecondaryLanguageMenuClassName = () => {
    const base = `coa-I18nBanner__other-language-options`;
    return this.state.isOpen ? `${base}--open` : `${base}--closed`;
  }

  handleSetLanguage = (e) => {
    this.props.handleManualLanguageUpdate(e.target.lang)
    this.setState({
      isOpen: false,
    })
  }

  handleExpandMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  render() {

    return (
      <div className="coa-I18nBanner">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-4 col-xs">
              <div className="coa-I18nBanner__prompt">
                Choose your preferred language
              </div>
            </div>
            <div className="col-md-8 col-xs-12">
              <ul className="coa-I18nBanner__language-list">
                { this.visibleLanguageOptions.map((language, i) => {
                    return (
                      <li className={`coa-I18nBanner__language ${this.getLanguageMenuClassName(language)}`}
                        key={i} onClick={this.handleSetLanguage}
                      >
                        <Link to={`/${language.code}/${this.getPathname()}`}>
                          <span className="hidden--sm visible--md"
                            lang={language.code}
                            >
                            {language.title}
                          </span>
                          <span className="hidden--md visible--sm"
                            lang={language.code}
                            >
                            {language.abbr.toUpperCase()}
                          </span>
                        </Link>
                      </li>
                    )
                })}
                { this.secondaryLanguageOptions.length > 0 &&
                  <li className="coa-I18nBanner__language coa-I18nBanner__language--other"
                    onClick={this.handleExpandMenu}
                  >
                    <span className="hidden--sm">Other Language </span>
                    <CaretDownSVG size="20"/>
                    <ul className={this.getSecondaryLanguageMenuClassName()}>
                      { this.secondaryLanguageOptions.map((language, i) => {
                          return (
                            <li onClick={this.handleSetLanguage}
                              className={this.getLanguageMenuClassName(language)}
                              key={i}
                            >
                              <Link to={`/${language.code}/${this.getPathname()}`}>
                                <span lang={language.code}>
                                  {language.title}
                                </span>
                              </Link>
                            </li>
                          )
                        })
                      }
                    </ul>
                  </li>
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default I18nBanner;
