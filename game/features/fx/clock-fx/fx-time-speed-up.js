import FxBase from "../fx-base";

class FxTimeSpeedUp extends FxBase {
    execute(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: 100})
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: 1000})
    }
}

export default FxTimeSpeedUp;