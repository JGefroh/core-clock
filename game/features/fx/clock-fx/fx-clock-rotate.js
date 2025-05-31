import FxBase from "../fx-base";

class FxClockRotate extends FxBase {
    execute(core, params = {}) {
        core.send('SET_CLOCK_ROTATE', {direction: Math.random() < 0.5 ? -1 : 1})
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_ROTATE', {direction: 0})
    }
}

export default FxClockRotate