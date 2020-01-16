export { default as changeMouseType } from './changeMouseType';
export { default as deleteLayer } from './deleteLayer';
import { defaultLayer } from '../reducers';

export function changeActiveLayer (layer, layerNumber) {
  return { type: 'CHANGE_ACTIVE_LAYER', layer, layerNumber }
}

export function addLayer (layersCount) {
  return {
    type: 'ADD_LAYER',
    layer: {
      ...defaultLayer,
      name: 'New layer ' + layersCount,
    },
    layerNumber: layersCount
  }
}

export function changeLayer (layer, layerId) {
  return { type: 'CHANGE_LAYER', layer, layerId }
}

export function toggleMenuBar (menuBarNumber) {
  return { type: 'TOGGLE_MENU_BAR', menuBarNumber }
}

export function changeLayerVisibility (hidden, layerNumber) {
  return { type: 'CHANGE_LAYER_VISIBILITY', hidden, layerNumber }
}

export function addLine (element, layerNumber) {
  return { type: 'ADD_LINE', lineData: element.toDataURL(), layerNumber }
}

export function redoLine (layerNumber) {
  return { type: 'REDO_LINE', layerNumber };
}

export function undoLine (layerNumber) {
  return { type: 'UNDO_LINE', layerNumber };
}

export function changeColor (color) {
  return { type: 'CHANGE_COLOR', color };
}

export function addShape (shape, layerNumber) {
  return { type: 'ADD_SHAPE', shape, layerNumber }
}

export function reorderLayers (oldIndex, newIndex) {
  return { type: 'REORDER_LAYERS', oldIndex, newIndex }
}

export function changeFonts (font) {
  return { type: 'CHANGE_FONT', font };
}

export function addTextToLayer (text, layerNumber) {
  return { type: 'ADD_TEXT', text, layerNumber }
}