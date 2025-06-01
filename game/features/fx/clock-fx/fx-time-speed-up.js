import FxBase from "../fx-base";

class FxTimeSpeedUp extends FxBase {
    execute(core, params = {}) {
        let speed = Math.random() * 500
        core.send('SET_CLOCK_SPEED', { ms: speed})
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: 1000})
    }
}

export default FxTimeSpeedUp;