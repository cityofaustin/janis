import React, { Component, Fragment } from 'react';

const EditController = ({ children, isEditing, toggleEditingMode }) => (
  <Fragment>
    <div className={isEditing ? 'coa-editing' : ''}>{children}</div>
    {isEditing ? (
      <div className="coa-FixedEditBar">
        <button
          className="coa-FixedEditBar__submit"
          onClick={toggleEditingMode}
        >
          Submit Changes
        </button>
      </div>
    ) : (
      <Fragment>
        <div className="coa-EditButton__wrapper">
          <span className="coa-EditButton__text">See an Error?</span>
          <button className="coa-EditButton" onClick={toggleEditingMode}>
            Edit Content
          </button>
        </div>
      </Fragment>
    )}
  </Fragment>
);

export default EditController;
