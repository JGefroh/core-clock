import FxBase from "../fx-base";

class FxClockVolumeChange extends FxBase {
    execute(core, params = {}) {
        core.send('SET_CLOCK_VOLUME', params)
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_VOLUME', { volume: 0.8})
    }
}

export default FxClockVolumeChange