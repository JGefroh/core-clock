import FxBase from "../fx-base";

class FxClockTockTock extends FxBase {
    execute(core, params = {}) {
        core.send('SET_CLOCK_TOCK_TOCK', { tocktock: true })
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_TOCK_TOCK', { tocktock: false })
    }
}

export default FxClockTockTock