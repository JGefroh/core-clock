import FxBase from "../fx-base";

class FxTimeSpeedDown extends FxBase {
    execute(core, params = {}) {
        let speed = Math.random() * 3000
        core.send('SET_CLOCK_SPEED', { ms: speed})
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: 1000})
    }
}

export default FxTimeSpeedDown