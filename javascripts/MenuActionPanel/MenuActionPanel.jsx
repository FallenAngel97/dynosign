import React from "react";
import "./MenuActionPanel.scss";
import { connect } from "react-redux";
const { dialog } = require('electron').remote;
const { ipcRenderer } = require('electron');
class MenuActionPanel extends React.Component {
    constructor(props) {
        super(props);
        this.saveFile = this.saveFile.bind(this);
    }
    saveFile() {
        const options = {
            defaultPath: 'file.dsign'
        };
        const fileName = dialog.showSaveDialog(null, options);
        const fileContents = {
            fileName,
            layers: this.props.layersCRUD
        };
        if(fileName!=undefined)
            ipcRenderer.send('save-message', fileContents);
    }
    render() {
        return (
            <div style={{visibility: this.props.toggleMenuBar.menuBarVisible?'visible':'hidden'}} className='menuActionPanel'>
                <span className="menuBarActionButton" onClick={this.saveFile}>Save</span>
                <span className="menuBarActionButton">Open</span>
            </div>
        )
    }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps)(MenuActionPanel);
