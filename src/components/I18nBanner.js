import React, { Component } from 'react';
import locale from 'browser-locale';

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
    const languageAbbr = e.target.lang;
    this.setState({
      activeLanguage: languageAbbr,
      isOpen: false,
    })
  }

  render() {
    const displayedLanguageAmount = 4
    const visibleLanguageOptions = languages.slice(0, displayedLanguageAmount);
    const otherLanguageOptions = languages.slice(displayedLanguageAmount, languages.length);

    return (
      <div className="coa-I18nBanner">
        <div className="wrapper">
          <div className="row">
            <div className="col-xs">
              Choose your preferred language
            </div>
            <div className="col-xs">
              <ul className="coa-I18nBanner__language-list">
                { visibleLanguageOptions.map((language, i) => {
                    return (
                      <li className={`coa-I18nBanner__language ${this.languageClassName(language)}`}
                        onClick={this.setLangauage} lang={language.abbr}
                        key={i}
                      >
                        {language.title}
                      </li>
                    )
                })}
                { otherLanguageOptions.length > 0 &&
                  <li className="coa-I18nBanner__language--other" lang=""
                    onClick={() => this.setState({ isOpen: !this.state.isOpen })}
                  >
                    Other Language
                    <ul className={this.otherLanguageClassName()}>
                      { otherLanguageOptions.map((language) => {
                          return (
                            <li lang={language.abbr} onClick={this.setLangauage} className={this.languageClassName(language)}>
                              {language.title}
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
