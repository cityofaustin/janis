import React, { Component, Fragment } from 'react';

const EditController = ({ children, isEditing, handleClick }) => (
  <Fragment>
    <div className={isEditing ? 'coa-editing' : ''}>{children}</div>
    <button className="coa-EditButton" onClick={handleClick}>
      {isEditing ? 'Exit Edit Mode' : 'Edit'}
    </button>
  </Fragment>
);

export default EditController;
