import FxBase from "../fx-base";

class FxZoomIn extends FxBase {
    execute(core, params = {}) {
        core.send('SET_VIEWPORT_SCALE_CHANGE_RATE', {scale: 0.00005})
    }
    
    undo(core, params = {}) {
        core.send('SET_VIEWPORT_SCALE', {scale: 1})
        core.send('SET_VIEWPORT_SCALE_CHANGE_RATE', {scale: 0})
    }
}

export default FxZoomIn