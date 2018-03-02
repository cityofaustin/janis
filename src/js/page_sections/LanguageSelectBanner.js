import React, { Component } from 'react';
import { NavLink } from 'react-static';
import Cookies from 'js-cookie'
import { find } from 'lodash'
import { SUPPORTED_LANGUAGES } from 'js/constants/languages'
import CaretDownSVG from 'js/svg/CaretDown';
import CaretUpSVG from 'js/svg/CaretUp';

class LanguageSelectBanner extends Component {
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
      <div className={`coa-LanguageSelectBanner ${this.state.isOpen ? 'coa-LanguageSelectBanner--open' : ''}`}>
        <div className="wrapper">
          <div className="row">
            <div className="col-md-12 col-xs-12">
              <div className="coa-LanguageSelectBanner__choose-language"
                onClick={this.handleExpandMenu}
              >
                <span>Choose Language
                  <span className="coa-link coa-LanguageSelectBanner__choose-language-link">
                    { selectedLanguage.title }
                  </span>
                </span>
                {
                  this.state.isOpen ?
                    <CaretUpSVG size="20"/> :
                    <CaretDownSVG size="20"/>
                }
                <div className={`coa-LanguageSelectBanner__dropdown-menu ${this.state.isOpen ? 'coa-LanguageSelectBanner__dropdown-menu--open' : ''}`}>
                  <div className="wrapper">
                    <h4 className="coa-LanguageSelectBanner__menu-header">
                      Translated by City of Austin
                    </h4>
                    <ul className="coa-LanguageSelectBanner__language-list">
                      { SUPPORTED_LANGUAGES.map(({title, abbr, code}, i) => {
                        return (
                          <li
                            key={i}
                          >
                            <NavLink
                              to={`/${code}/${this.props.path}`}
                              className="coa-LanguageSelectBanner__language-item"
                              activeClassName="coa-LanguageSelectBanner__language-item--active"
                            >
                              {title}
                            </NavLink>
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
