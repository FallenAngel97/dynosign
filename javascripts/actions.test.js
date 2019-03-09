import * as actions from "./actions";

describe("Redux actions testing", () => {
    it('should change mouse type', () => {
        const mouseType = 'select';
        const expectedAction = {
            type: 'CHANGE_MOUSE_TYPE',
            mouseType
        };
        expect(actions.changeMouseType(mouseType)).toEqual(expectedAction);
    })
    it("should delete layer", () => {
        const layerId = 2;
        const expectedAction = {
            type: 'DELETE_LAYER',
            layerId
        }
        expect(actions.deleteLayer(layerId)).toEqual(expectedAction);
    });
    it("should change active layer", () => {
        const layerNumber = 2;
        const layer = defaultLayer;
        const expectedAction = { type: 'CHANGE_ACTIVE_LAYER', layer, layerNumber }
        expect(actions.changeActiveLayer(layer,layerNumber)).toEqual(expectedAction);
    });
    it("should change Layer", () => {
        const layerId = 2;
        const layer = defaultLayer;
        const expectedAction = { type: 'CHANGE_LAYER', layer, layerId }
        expect(actions.changeLayer(layer,layerId)).toEqual(expectedAction);
    });
    it("should toggle Menu Bar", () => {
        const menuBarVisible = false;
        const expectedAction = {type: 'TOGGLE_MENU_BAR', menuBarVisible};
        expect(actions.toggleMenuBar(menuBarVisible)).toEqual(expectedAction);
    });
    it("should change Layer Visibility", () => {
        const hidden = true;
        const layerNumber = 3;
        const expectedAction = {type: 'CHANGE_LAYER_VISIBILITY', hidden, layerNumber};
        expect(actions.changeLayerVisibility(hidden, layerNumber)).toEqual(expectedAction);
    });
    it("should add layer", () => {
        const layersCount = 3;
        const expectedAction = { type: 'ADD_LAYER', layer: {  
            opacity: 100,
            linesArray: [],
            name: 'New layer '+ layersCount,
            hidden: false},
            layerNumber: layersCount
        };
        expect(actions.addLayer(layersCount)).toEqual(expectedAction);
    });
    it("should add line to layer", () => {
        const canvas = document.createElement('canvas');
        const layerNumber = 2;
        const expectedAction = {
            type: 'ADD_LINE', lineData: canvas.toDataURL(), layerNumber
        }
        expect(actions.addLine(canvas, layerNumber)).toEqual(expectedAction);
    });
    it("should redo last line", () => {
        const layerNumber = 2;
        const expectedAction = {type: 'REDO_LINE', layerNumber};
        expect(actions.redoLine(layerNumber)).toEqual(expectedAction);
    });
    it("should undo last line", () => {
        const layerNumber = 2;
        const expectedAction = {type: 'UNDO_LINE', layerNumber};
        expect(actions.undoLine(layerNumber)).toEqual(expectedAction);
    });
    it("should change color", () => {
        const color = '#f00';
        const expectedAction = {type: 'CHANGE_COLOR', color};
        expect(actions.change_color(color)).toEqual(expectedAction);
    });

});
