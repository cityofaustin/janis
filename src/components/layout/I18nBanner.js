import React, { Component } from 'react';
import locale from 'browser-locale';

import CaretDownSVG from 'svg/CaretDown';

const languages = [
  {
    title: 'English',
    abbr: 'en',
  }, {
    title: 'Español',
    abbr: 'es',
  }, {
    title: 'Tiếng Việt',
    abbr: 'vn',
  }, {
    title: '中文',
    abbr: 'zh',
  }, {
    title: 'عربى',
    abbr: 'ar',
  }, {
    title: '한국어',
    abbr: 'ko',
  }, {
    title: 'اردو',
    abbr: 'ur',
  }, {
    title: 'မြန်မာ',
    abbr: 'my',
  },
]

class I18nBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLanguage: locale().substring(0,2) || 'en',
    };
    this.displayedLanguageAmount = 4;
    this.visibleLanguageOptions = languages.slice(0, this.displayedLanguageAmount);
    this.secondaryLanguageOptions = languages.slice(this.displayedLanguageAmount, languages.length);
  }

  getLanguageMenuClassName = (language) => {
    const classNameBase = `coa-I18nBanner__language`;
    return language.abbr === this.state.activeLanguage
             ? `${classNameBase}--active`
             : ''
  }

  getSecondaryLanguageMenuClassName = () => {
    const base = `coa-I18nBanner__other-language-options`;
    return this.state.isOpen ? `${base}--open` : `${base}--closed`;
  }

  handleSetLanguage = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const languageAbbr = e.target.lang;
    console.log(languageAbbr)
    this.setState({
      activeLanguage: languageAbbr,
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
                        onClick={this.handleSetLanguage}
                        key={i}
                      >
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
                              <span lang={language.abbr}>
                                {language.title}
                              </span>
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
