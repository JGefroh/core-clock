import FxBase from "../fx-base";

class FxClockShrinkHands extends FxBase {
    execute(core, params = {}) {
        core.send('SET_CLOCK_SHRINK_HANDS', { shouldShrinkHands: true} );
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_SHRINK_HANDS', { shouldShrinkHands: false} );
    }
}

export default FxClockShrinkHands