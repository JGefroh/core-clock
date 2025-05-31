import FxBase from "../fx-base";

class FxTimeStop extends FxBase {
    execute(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: Infinity})
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_SPEED', { ms: 1000})
    }
}

export default FxTimeStop