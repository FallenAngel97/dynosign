import * as actions from "./actions";

const defaultLayer = {
    opacity: 100,
    name: 'New layer',
    hidden: false
}

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
});