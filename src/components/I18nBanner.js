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
    abbr: 'cn',
  }, {
    title: 'Português',
    abbr: 'pt',
  }, {
    title: 'French',
    abbr: 'fr',
  },
]

class I18nBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeLanguage: locale().substring(0,2) || 'en', // we could
    };
  }

  languageClassName = (language) => {
    const classNameBase = `coa-I18nBanner__language`;
    return language.abbr === this.state.activeLanguage
             ? `${classNameBase}--active`
             : ''
  }

  otherLanguageClassName = () => {
    const base = `coa-I18nBanner__other-language-options`;
    return this.state.isOpen ? `${base}--open` : `${base}--closed`;
  }

  setLangauage = (e) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    const languageAbbr = e.target.parentElement.lang;
    this.setState({
      activeLanguage: languageAbbr,
      isOpen: false,
    })
    console.log(this.state.activeLanguage)
  }

  render() {
    const displayedLanguageAmount = 4
    const visibleLanguageOptions = languages.slice(0, displayedLanguageAmount);
    const otherLanguageOptions = languages.slice(displayedLanguageAmount, languages.length);

    return (
      <div className="coa-I18nBanner">
        <div className="wrapper">
          <div className="row">
            <div className="col-md-4 col-xs coa-I18nBanner__prompt">
              Choose your preferred language
            </div>
            <div className="col-md-8 col-xs-12">
              <ul className="coa-I18nBanner__language-list">
                { visibleLanguageOptions.map((language, i) => {
                    return (
                      <li className={`coa-I18nBanner__language ${this.languageClassName(language)}`}
                        onClick={this.setLangauage} lang={language.abbr}
                        key={i}
                      >
                        <span className="coa-I18nBanner__language--hide-sm">{language.title}</span>
                        <span className="coa-I18nBanner__language--hide-md">{language.abbr.toUpperCase()}</span>
                      </li>
                    )
                })}
                { otherLanguageOptions.length > 0 &&
                  <li className="coa-I18nBanner__language--other" lang=""
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                  >
                    <span className="coa-I18nBanner__language--hide-sm">Other Language </span>
                    <CaretDownSVG size="20"/>
                    <ul className={this.otherLanguageClassName()}>
                      { otherLanguageOptions.map((language) => {
                          return (
                            <li lang={language.abbr} onClick={this.setLangauage} className={this.languageClassName(language)}>
                              <span>{language.title}</span>
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
