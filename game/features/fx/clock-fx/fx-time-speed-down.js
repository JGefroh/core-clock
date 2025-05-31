import FxBase from "../fx-base";

class FxTimeSpeedDown extends FxBase {
    execute(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: 1500})
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: 1000})
    }
}

export default FxTimeSpeedDown