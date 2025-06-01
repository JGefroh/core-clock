import { default as System } from '@core/system';

export default class HeartbeatSystem extends System {
    constructor() {
        super();
        this.bpm = 120; // Default BPM
        this.volume = 0.2; // Initial volume
        this.lastBeatTime = 0;
        this.currentBeat = 0;
        this.maxSanity = 300;
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
    
        const clampedSanity = Math.max(0, Math.min(this.maxSanity, sanity)); // 0–maxSanity
        
        const firstThreshold = this.maxSanity * 0.5; // 50% of max sanity

        if (clampedSanity >= firstThreshold) {
            this.bpm = 60 + (65 - 60) * (this.maxSanity - clampedSanity) / (this.maxSanity - firstThreshold); 
            this.volume = 0.0 + (0.1 - 0.0) * (this.maxSanity - clampedSanity) / (this.maxSanity - firstThreshold);
        } else if (clampedSanity > 0) {
            const sanityFactor = (firstThreshold - clampedSanity) / firstThreshold; // 0 at firstThreshold, 1 at 0
            this.bpm = 65 + (180 - 65) * sanityFactor;
            this.volume = 0.1 + (1.0 - 0.1) * sanityFactor;
        } else {
            this.bpm = 0;
            this.volume = 0;
        }
    }

    work() {
        this.setBPMAndVolumeFromSanity();
        this.playHeartbeat();
    }
}