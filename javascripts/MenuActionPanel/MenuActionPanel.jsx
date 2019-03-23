/* eslint-disable curly */
import React from 'react';
import './MenuActionPanel.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
const { dialog } = require('electron').remote;
const { ipcRenderer } = require('electron');

const FileOptions = (props) => (
  <div className='menuActionPanel'>
    <span onClick={props.saveFile} className="menuBarActionButton">Save</span>
    <span className="menuBarActionButton">Open</span>
    <span className='menuBarActionButton'>Quit</span>
  </div>
);

FileOptions.propTypes = {
  saveFile: PropTypes.func
}

const EditOptions = (props) => (
  <div className='menuActionPanel'>
    <span className="menuBarActionButton">Undo</span>
    <span className='menuBarActionButton'>Redo</span>
    <span className="menuBarActionButton">Preferences</span>
  </div>
);

/**
 * Block, which shows after click in menu. Modal window, in short
 * @module MenuActionPanel
 */

class MenuActionPanel extends React.Component {
  constructor (props) {
    super(props);
    this.saveFile = this.saveFile.bind(this);
  }
  /**
   * Calls node.js backend api to save JSON-converted state of program
   */
  saveFile () {
    const options = {
      defaultPath: 'file.dsign',
      filters: [{
        name: 'DynoSign files',
        extensions: ['dsign']
      }, {
        name: 'PNG image',
        extensions: ['png']
      }, {
        name: 'JPEG image',
        extensions: ['jpeg', 'jpg']
      }]
    };
    const fileName = dialog.showSaveDialog(null, options);
    const fileContents = {
      fileName,
      layers: this.props.layersCRUD,
      lastUsedFont: this.props.changeFont,
      lastUsedColor: this.props.changeColor
    };
    const extension = fileName.split('.')[1];
    if (extension === 'jpg') {
      let canvas = document.getElementsByTagName('canvas')[0].cloneNode();
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      this.props.layersCRUD.map((layer) => {
        let linesArray = layer.linesArray;
        let layerImg = new Image();
        layerImg.src = linesArray[linesArray.length - 1];
        if (layer.shapes)
          layer.shapes.map((shape) => {
            shape.draw(ctx);
          })
        layerImg.onload = () => {
          ctx.drawImage(layerImg, 0, 0);
        }
      });
      const image = ctx.canvas.toDataURL('image/jpeg', 1)
        .replace(/^data:image\/\w+;base64,/, '');
      fileContents.image = image;
    }
    if (fileName !== undefined)
      ipcRenderer.send('save-message', fileContents);
  }
  render () {
    switch (this.props.toggleMenuBar.menuBarNumber) {
      case 1:
        return <FileOptions saveFile={this.saveFile} />
      case 2:
        return <EditOptions />
      default:
        return '';
    }
  }
}

MenuActionPanel.propTypes = {
  layersCRUD: PropTypes.array,
  toggleMenuBar: PropTypes.object,
  changeFont: PropTypes.object,
  changeColor: PropTypes.object
}

const mapStateToProps = state => state;

export default connect(mapStateToProps)(MenuActionPanel);
