import { default as System } from '@core/system';

export default class HeartbeatSystem extends System {
    constructor() {
        super();
        this.bpm = 120; // Default BPM
        this.volume = 0.2; // Initial volume
        this.lastBeatTime = 0;
        this.currentBeat = 0;
    }

    setBPM(bpm) {
        this.bpm = bpm;
    }

    playHeartbeat() {
        const now = performance.now();
        const interval = (60 / this.bpm) * 1000;

        if (now - this.lastBeatTime >= interval) {
            this.send('PLAY_AUDIO', {
                audioKey: 'heartbeat-full.mp3',
                volume: this.volume,
            });
            this.lastBeatTime = now;
        }
    }
    
    setBPMAndVolumeFromSanity() {
        const sanity = this._core.getData('CURRENT_SANITY');
    
        const clampedSanity = Math.max(0, Math.min(500, sanity)); // 0–500
    
        if (clampedSanity >= 450) {
            // From 500 to 450 sanity: volume starts to fade in, BPM slightly increases
            this.bpm = 60 + (65 - 60) * (500 - clampedSanity) / 50; // 60 BPM at 500, 65 BPM at 450
            this.volume = 0.0 + (0.1 - 0.0) * (500 - clampedSanity) / 50; // 0.0 volume at 500, 0.1 at 450
        } else if (clampedSanity > 0) {
            // Below 450 sanity
            const sanityFactor = (450 - clampedSanity) / 450; // 0 at 450, 1 at 0
            this.bpm = 65 + (180 - 65) * sanityFactor;         // 65 BPM at 450, 180 BPM at 0
            this.volume = 0.1 + (1.0 - 0.1) * sanityFactor;    // 0.1 volume at 450, 1.0 at 0
        }
        else {
            this.bpm = 0;
            this.volume = 0;
        }
    }

    work() {
        this.setBPMAndVolumeFromSanity();
        this.playHeartbeat();
    }
}