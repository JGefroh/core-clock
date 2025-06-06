import FxBase from "../fx-base";

class FxClockVolumeChange extends FxBase {
    execute(core, params = {}) {

        const rand = Math.random();
        params = {
            volume: rand < 0.5 ? 0.0 : 0.05
        };
        core.send('SET_CLOCK_VOLUME', params)
    }
    
    undo(core, params = {}) {
        core.send('SET_CLOCK_VOLUME', { volume: 0.6})
    }
}

export default FxClockVolumeChange