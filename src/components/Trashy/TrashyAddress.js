import React from 'react';
import Downshift from 'downshift';

const TrashyAddress = ({ suggestions, setParcelId }) => (
  <Downshift
    onChange={selection => setParcelId(selection.parcelId)}
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
        <input {...getInputProps()} />
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
