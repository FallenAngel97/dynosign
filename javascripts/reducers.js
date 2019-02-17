import { combineReducers } from 'redux'

const defaultLayer = {
    opacity: 100,
    name: 'New layer',
    hidden: false
}

function changeActiveLayer(state={type: 'CHANGE_ACTIVE_LAYER', layerNumber: 0}, action) {
    if(action.type == 'CHANGE_ACTIVE_LAYER') {
        return Object.assign({}, state, {layerNumber: action.layerNumber})
    }
    return state;
}

function layersCRUD(state=[defaultLayer], action) {
    if(action.type=='ADD_LAYER') {
        return [...state, action.layer]
    }
    return state;
}

function changeMouseType(state={type: 'CHANGE_MOUSE_TYPE', mouseType: 'default'}, action) {
    if(action.type == 'CHANGE_MOUSE_TYPE') {
        return Object.assign({}, state, {mouseType: action.mouseType})
    }
    return state;
}


export default combineReducers({
    changeActiveLayer, 
    layersCRUD,
    changeMouseType
})