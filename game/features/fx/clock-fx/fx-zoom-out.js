import FxBase from "../fx-base";

class FxZoomOut extends FxBase {
    execute(core, params = {}) {
        core.send('SET_VIEWPORT_SCALE_CHANGE_RATE', {scale: -0.01})
    }
    
    undo(core, params = {}) {
        core.send('SET_VIEWPORT_SCALE', {scale: 1})
        core.send('SET_VIEWPORT_SCALE_CHANGE_RATE', {scale: 0})
    }
}

export default FxZoomOut