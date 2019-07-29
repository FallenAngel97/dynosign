import React from 'react';
import PropTypes from 'prop-types';

export const FileOptions = (props) => (
  <div className='menuActionPanel'>
    <span onClick={props.saveFile} className="menuBarActionButton">Save</span>
    <span onClick={props.openFile} className="menuBarActionButton">Open</span>
    <span className='menuBarActionButton'>Quit</span>
  </div>
);

FileOptions.propTypes = {
  saveFile: PropTypes.func,
  openFile: PropTypes.func
}

export const EditOptions = (props) => (
  <div className='menuActionPanel'>
    <span className="menuBarActionButton">Undo</span>
    <span className='menuBarActionButton'>Redo</span>
    <span onClick={props.openSettings} className="menuBarActionButton">Settings</span>
  </div>
);

EditOptions.propTypes = {
  openSettings: PropTypes.func
}