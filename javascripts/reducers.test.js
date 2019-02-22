import {changeActiveLayer} from "./reducers"

const defaultLayer = {
    opacity: 100,
    name: 'New layer',
    hidden: false
}

describe("Redux reducers tests", () => {
    it("should return default state of active layers", () => {
        expect(changeActiveLayer(undefined, {})).toEqual({
            type: 'CHANGE_ACTIVE_LAYER',
            layer: defaultLayer,
            layerNumber: 0
        })
    });
});