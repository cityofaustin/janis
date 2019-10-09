import React from 'react';
import Downshift from 'downshift';
import { injectIntl } from 'react-intl';
import classNames from 'classnames';

import { callToAction as i18n } from 'js/i18n/definitions';
import CloseSVG from 'components/SVGs/Close';

const TrashyAddress = ({ suggestions, setAddress, getSuggestions, intl }) => (
  <Downshift
    onChange={selection => setAddress(selection)}
    itemToString={item => (item ? item.name : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
      clearSelection,
    }) => (
      <div>
        <label {...getLabelProps()}>
          {intl.formatMessage(i18n.enterAddress)}
        </label>
        <input
          {...getInputProps({
            onChange: e => {
              getSuggestions(e.target.value);
              clearSelection();
            },
          })}
        />
        {selectedItem && (
          <div
            className="coa-Trashy__autosuggestion-clear"
            onClick={clearSelection}
          >
            <i className="material-icons">close</i>
          </div>
        )}
        {isOpen ? (
          <div>
            {suggestions
              .filter(
                item =>
                  !inputValue ||
                  item.name.toLowerCase().includes(inputValue.toLowerCase()),
              )
              .map((item, index) => (
                <div
                  {...getItemProps({
                    key: item.parcel_id,
                    index,
                    item,
                    className: classNames('coa-Trashy__autosuggestion', {
                      'coa-Trashy__autosuggestion--highlighted':
                        highlightedIndex === index,
                    }),
                  })}
                >
                  {item.name}
                </div>
              ))}
          </div>
        ) : null}
      </div>
    )}
  </Downshift>
);

export default injectIntl(TrashyAddress);
