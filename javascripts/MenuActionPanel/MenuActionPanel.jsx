import React from "react";
import "./MenuActionPanel.scss";
import { connect } from "react-redux";
const { dialog } = require('electron').remote;

class MenuActionPanel extends React.Component {
    render() {
        return (
            <div style={{visibility: this.props.toggleMenuBar.menuBarVisible?'visible':'hidden'}} className='menuActionPanel'>
                <span className="menuBarActionButton" onClick={() => console.log(dialog.showSaveDialog())}>Save</span>
                <span className="menuBarActionButton">Open</span>
            </div>
        )
    }
}

const mapStateToProps = state => state;


export default connect(mapStateToProps)(MenuActionPanel);
