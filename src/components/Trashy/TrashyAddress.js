import React from 'react';
import Downshift from 'downshift';

const TrashyAddress = ({ suggestions, setAddress, setEnteredText }) => (
  <Downshift
    onChange={selection => setAddress(selection)}
    itemToString={item => (item ? item.displayName : '')}
  >
    {({
      getInputProps,
      getItemProps,
      getLabelProps,
      isOpen,
      inputValue,
      highlightedIndex,
      selectedItem,
    }) => (
      <div>
        <label {...getLabelProps()}>Type your street address in the box</label>
        <input
          {...getInputProps({
            onChange: e => setEnteredText(e.target.value),
          })}
        />
        {isOpen ? (
          <div>
            {suggestions
              .filter(
                item => !inputValue || item.displayName.includes(inputValue),
              )
              .map((item, index) => (
                <div
                  className="coa-Trashy__autosuggestion"
                  {...getItemProps({
                    key: item.parcelId,
                    index,
                    item,
                    style: {
                      backgroundColor:
                        highlightedIndex === index ? 'lightgray' : 'white',
                      fontWeight: selectedItem === item ? 'bold' : 'normal',
                    },
                  })}
                >
                  {item.displayName}
                </div>
              ))}
          </div>
        ) : null}
      </div>
    )}
  </Downshift>
);

export default TrashyAddress;
