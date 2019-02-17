'use strict'

import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import {Provider} from "react-redux";
import LeftBar from "./LeftBar/LeftBar.jsx";
import MainArea from "./MainArea/MainArea.jsx";
import RightPanel from "./RightPanel/RightPanel.jsx";
import TopBar from "./TopBar/TopBar.jsx"
import "./entry.scss";

function addLayer(state={type: 'ADD_LAYER', layerId: -1}, action) {
    if(action.type=='ADD_LAYER') {
        return Object.assign({}, state, {layerId: layerId})
    }
    return state
}

function changeMouseType(state={type: 'CHANGE_MOUSE_TYPE', mouseType: 'default'}, action) {
    if(action.type == 'CHANGE_MOUSE_TYPE') {
        return Object.assign({}, state, {mouseType: action.mouseType})
    }
    return state;
}

const store = createStore(combineReducers({addLayer, changeMouseType}));

class DynoSign extends React.Component {
    render() {
        return(
        <Provider store={store}>
            <TopBar />
            <div id='programContainer'>
                <LeftBar />
                <MainArea />
                <RightPanel />
            </div>
        </Provider>)
    }
}

ReactDOM.render(<DynoSign />, document.getElementById('content'));

if (module.hot) {
 module.hot.accept()
}
