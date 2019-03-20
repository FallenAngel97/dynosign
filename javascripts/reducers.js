import { combineReducers } from 'redux'
import { ipcRenderer } from 'electron'

export const defaultLayer = {
  opacity: 100,
  name: 'New layer',
  hidden: false,
  linesArray: [],
  text: '',
  shapes: []
}

export function changeActiveLayer (
  state = {
    type: 'CHANGE_ACTIVE_LAYER',
    layer: defaultLayer,
    layerNumber: 0
  },
  action
) {
  switch (action.type) {
    case 'CHANGE_ACTIVE_LAYER':
      return Object.assign({}, state, { layer: action.layer, layerNumber: action.layerNumber })
    case 'ADD_LAYER':
      return Object.assign({}, state, { layer: action.layer, layerNumber: action.layerNumber })
    case 'DELETE_LAYER':
      let layerNumber = (action.layerId - 1 < 0) ? 0 : action.layerId - 1;
      return Object.assign({}, state, { layerNumber })
    case 'REORDER_LAYERS':
      return Object.assign({}, state, { layerNumber: action.newIndex })
  }
  return state;
}

export function layersCRUD (state = [defaultLayer], action) {
  switch (action.type) {
    case 'ADD_LAYER':
      return [...state, action.layer]
    case 'CHANGE_LAYER':
      return state.map((item, index) => {
        if (index !== action.layerId) {
          return item;
        }
        return {
          ...item,
          ...action.layer
        }
      })
    case 'DELETE_LAYER':
      return [
        ...state.slice(0, action.layerId),
        ...state.slice(action.layerId + 1)
      ]
    case 'CHANGE_LAYER_VISIBILITY':
      return state.map((item, index) => {
        if (index !== action.layerNumber) {
          return item;
        }
        return {
          ...item,
          hidden: action.hidden
        }
      })
    case 'ADD_LINE':
      return state.map((item, index) => {
        if (index !== action.layerNumber) {
          return item;
        }
        return {
          ...item,
          linesArray: [...item.linesArray, action.lineData]
        }
      });
    case 'REDO_LINE':
      return state.map((item, index) => {
        if (index !== action.layerNumber) {
          return item;
        }
        return {
          ...item,
          linesArray: [...item.linesArray.slice(0, item.linesArray.length - 1)]
        }
      });
    case 'ADD_SHAPE':
      return state.map((item, index) => {
        if (index !== action.layerNumber) {
          return item;
        }
        return {
          ...item,
          shapes: [...item.shapes, action.shape]
        }
      });
    case 'REORDER_LAYERS':
      const oIndex = Math.max(action.newIndex, action.oldIndex);
      const nIndex = Math.min(action.oldIndex, action.newIndex);
      const firstPart = state.slice(0, nIndex);
      const secondPart = state.slice(nIndex + 1, oIndex + 1);
      const thirdPart = state.slice(oIndex + 1, state.length)
      return [
        ...firstPart,
        ...secondPart,
        state[nIndex],
        ...thirdPart
      ]
  }
  return state;
}

export function changeMouseType (state = { type: 'CHANGE_MOUSE_TYPE', mouseType: 'default' }, action) {
  if (action.type === 'CHANGE_MOUSE_TYPE') {
    return Object.assign({}, state, { mouseType: action.mouseType })
  }
  return state;
}

export function toggleMenuBar (state = { type: 'TOGGLE_MENU_BAR', menuBarNumber: -1 }, action) {
  if (action.type === 'TOGGLE_MENU_BAR') {
    return Object.assign({}, state, { menuBarNumber: action.menuBarNumber })
  }
  return state;
}

export const color = {
  r: '241',
  g: '112',
  b: '19',
  a: '1'
}

export function changeColor (state = { type: 'CHANGE_COLOR', color }, action) {
  if (action.type === 'CHANGE_COLOR') {
    return Object.assign({}, state, { color: action.color })
  }
  return state;
}

const fonts = ipcRenderer.sendSync('getfonts', 'ping');

console.log(fonts);

export function changeFont (state = { type: 'CHANGE_FONT', font: { value: fonts[0], label: fonts[0].family } }, action) {
  if (action.type === 'CHANGE_FONT') {
    return Object.assign({}, state, { font: action.font })
  }
  return state;
}

export default combineReducers({
  changeActiveLayer,
  layersCRUD,
  changeMouseType,
  toggleMenuBar,
  changeColor,
  changeFont
})
