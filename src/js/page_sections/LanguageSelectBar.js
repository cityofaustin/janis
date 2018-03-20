import React, { Component } from 'react';
import { NavLink } from 'react-static';
import { find } from 'lodash';
import { SUPPORTED_LANGUAGES } from 'js/i18n/constants';
import CaretDownSVG from 'js/svg/CaretDown';
import CaretUpSVG from 'js/svg/CaretUp';

class LanguageSelectBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  handleExpandMenu = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  handleCancel = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {

    const selectedLanguage = find(SUPPORTED_LANGUAGES, {'code': this.props.lang});

    return (
      <div className={`coa-LanguageSelectBar ${this.state.isOpen ? 'coa-LanguageSelectBar--open' : ''}`}>
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="coa-LanguageSelectBar__choose-language"
                onClick={this.handleExpandMenu}
              >
                <span>Choose Language
                  <span className="coa-link coa-LanguageSelectBar__choose-language-link">
                    { selectedLanguage.title }
                  </span>
                </span>
                {
                  this.state.isOpen ?
                    <CaretUpSVG size="20"/> :
                    <CaretDownSVG size="20"/>
                }
                <div className={`coa-LanguageSelectBar__dropdown-menu ${this.state.isOpen ? 'coa-LanguageSelectBar__dropdown-menu--open' : ''}`}>
                  <div className="wrapper">
                    <h4 className="coa-LanguageSelectBar__menu-header">
                      Translated by City of Austin
                    </h4>
                    <ul className="coa-LanguageSelectBar__language-list">
                      { SUPPORTED_LANGUAGES.map(({title, abbr, code}, i) => {
                        return (
                          <li
                            key={i}
                          >
                            <NavLink
                              to={`/${code}/${this.props.path}`}
                              className="coa-LanguageSelectBar__language-item"
                              activeClassName="coa-LanguageSelectBar__language-item--active"
                            >
                              {title}
                            </NavLink>
                          </li>
                        )
                      })
                    }
                  </ul>
                </div>
                <p className="coa-link coa-LanguageSelectBar__cancel"
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

export default LanguageSelectBar;
