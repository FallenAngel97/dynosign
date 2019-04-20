/* global describe expect defaultLayer it */
import * as actions from './actions';

describe('Redux actions testing', () => {
  it('should change mouse type', () => {
    const mouseType = 'select';
    const expectedAction = {
      type: 'CHANGE_MOUSE_TYPE',
      mouseType
    };
    expect(actions.changeMouseType(mouseType)).toEqual(expectedAction);
  })
  it('should delete layer', () => {
    const layerId = 2;
    const expectedAction = {
      type: 'DELETE_LAYER',
      layerId
    }
    expect(actions.deleteLayer(layerId)).toEqual(expectedAction);
  });
  it('should change active layer', () => {
    const layerNumber = 2;
    const layer = defaultLayer;
    const expectedAction = { type: 'CHANGE_ACTIVE_LAYER', layer, layerNumber }
    expect(actions.changeActiveLayer(layer, layerNumber)).toEqual(expectedAction);
  });
  it('should change Layer', () => {
    const layerId = 2;
    const layer = defaultLayer;
    const expectedAction = { type: 'CHANGE_LAYER', layer, layerId }
    expect(actions.changeLayer(layer, layerId)).toEqual(expectedAction);
  });
  it('should toggle Menu Bar', () => {
    const menuBarNumber = 1;
    const expectedAction = { type: 'TOGGLE_MENU_BAR', menuBarNumber };
    expect(actions.toggleMenuBar(menuBarNumber)).toEqual(expectedAction);
  });
  it('should change Layer Visibility', () => {
    const hidden = true;
    const layerNumber = 3;
    const expectedAction = { type: 'CHANGE_LAYER_VISIBILITY', hidden, layerNumber };
    expect(actions.changeLayerVisibility(hidden, layerNumber)).toEqual(expectedAction);
  });
  it('should add layer', () => {
    const layersCount = 3;
    const expectedAction = {
      type: 'ADD_LAYER',
      layer: {
        opacity: 100,
        linesArray: [],
        name: 'New layer ' + layersCount,
        hidden: false
      },
      layerNumber: layersCount
    };
    expect(actions.addLayer(layersCount)).toEqual(expectedAction);
  });
  it('should add line to layer', () => {
    const canvas = document.createElement('canvas');
    const layerNumber = 2;
    const expectedAction = {
      type: 'ADD_LINE', lineData: canvas.toDataURL(), layerNumber
    }
    expect(actions.addLine(canvas, layerNumber)).toEqual(expectedAction);
  });
  it('should redo last line', () => {
    const layerNumber = 2;
    const expectedAction = { type: 'REDO_LINE', layerNumber };
    expect(actions.redoLine(layerNumber)).toEqual(expectedAction);
  });
  it('should undo last line', () => {
    const layerNumber = 2;
    const expectedAction = { type: 'UNDO_LINE', layerNumber };
    expect(actions.undoLine(layerNumber)).toEqual(expectedAction);
  });
  it('should change color', () => {
    const color = '#f00';
    const expectedAction = { type: 'CHANGE_COLOR', color };
    expect(actions.changeColor(color)).toEqual(expectedAction);
  });
  it('should reorder layers', () => {
    const oldIndex = 0;
    const newIndex = 4;
    const expectedAction = { type: 'REORDER_LAYERS', oldIndex, newIndex };
    expect(actions.reorderLayers(oldIndex, newIndex)).toEqual(expectedAction);
  })
  it('should add shape', () => {
    const shape = {
      type: 'rectangle'
    }
    const layerNumber = 1;
    const expectedAction = { type: 'ADD_SHAPE', shape, layerNumber };
    expect(actions.addShape(shape, layerNumber)).toEqual(expectedAction);
  });
  it('should change font', () => {
    const font = {
      type: 'Helvetica'
    }
    const expectedAction = { type: 'CHANGE_FONT', font };
    expect(actions.changeFonts(font)).toEqual(expectedAction);
  });
  it('should add text to layer', () => {
    const text = {
      text: 'Should save',
      posX: '124px',
      posY: '124px'
    }
    const layerNumber = 1;
    const expectedAction = { type: 'ADD_TEXT', text, layerNumber };
    expect(actions.addTextToLayer(text, layerNumber)).toEqual(expectedAction);
  });
});
