import React, { Component } from 'react'
import locale from 'browser-locale'
import { Link } from 'react-router-dom'

import CaretDownSVG from 'svg/CaretDown'
import SUPPORTED_LANGUAGES from 'constants/languages'


class I18nBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeLanguage: locale().substring(0,2) || 'en',
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
    return language.abbr === this.props.activeLanguage
             ? `${classNameBase}--active`
             : ''
  }

  getSecondaryLanguageMenuClassName = () => {
    const base = `coa-I18nBanner__other-language-options`;
    return this.state.isOpen ? `${base}--open` : `${base}--closed`;
  }

  handleSetLanguage = (e) => {
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // const languageAbbr = e.target.lang;
    // console.log(languageAbbr)
    this.setState({
      // activeLanguage: languageAbbr,
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
                        key={i}
                      >
                        <Link to={`/${language.code}/${this.getPathname()}`}>
                          <span className="hidden--sm visible--md"
                            lang={language.abbr}
                            >
                            {language.title}
                          </span>
                          <span className="hidden--md visible--sm"
                            lang={language.abbr}
                            >
                            {language.abbr.toUpperCase()}
                          </span>
                        </Link>
                      </li>
                    )
                })}
                { this.secondaryLanguageOptions.length > 0 &&
                  <li className="coa-I18nBanner__language--other"
                    onClick={this.handleExpandMenu}
                  >
                    <span className="hidden--sm">Other Language </span>
                    <CaretDownSVG size="20"/>
                    <ul className={this.getSecondaryLanguageMenuClassName()}>
                      { this.secondaryLanguageOptions.map((language) => {
                          return (
                            <li onClick={this.handleSetLanguage}
                              className={this.getLanguageMenuClassName(language)}
                            >
                              <Link to={`/${language.code}/${this.getPathname()}`}>
                                <span lang={language.abbr}>
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
