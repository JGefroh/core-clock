import { default as Core } from '@core/core';
import { default as Entity } from '@core/entity.js';
import { default as System } from '@core/system';

import { _getRandomFrom } from '@game/utilities/collection-util';

export default class SanitySystem extends System {
    constructor() {
        super()

        this.playerSanity = 500;
        this.wait = 1000;

        this.yes = [
            'yes-1.mp3',
            'yes-2.mp3',
            'yes-3.mp3',
            'yes-4.mp3',
        ]

        this.whisper_nos = [
            'no-whisper-1.mp3',
            'no-whisper-2.mp3',
            'no-whisper-3.mp3',
            'no-whisper-4.mp3',
        ]
        this.frustrated_nos = [
            'no-frustrated-1.mp3',
            'no-frustrated-2.mp3',
            'no-frustrated-3.mp3',
        ]
        this.aggressive_nos = [
            'no-aggressive-1.mp3',
            'no-aggressive-2.mp3',
            'no-aggressive-3.mp3',
            'no-aggressive-4.mp3',
        ]

        this.addHandler('DRAIN_SANITY', (payload) => {
            this.playerSanity -= payload.sanity;
            this.onDrainSanity();
        });

        this.addHandler('RESTORE_SANITY', (payload) => {
            this.playerSanity += payload.sanity;
            this.onRestoreSanity();
        });
    }

    work() {
        let drain = this._core.getData('CURRENT_EVENT_SANITY_DRAIN');
        if (drain >= 0) {
            this.playerSanity -= drain;
        }
        this._core.publishData('CURRENT_SANITY', this.playerSanity)
        this.randomSanityEvent();
    }

    onRestoreSanity() {
        this.send('PLAY_AUDIO', {   
            audioKey: _getRandomFrom(this.yes),
            volume: 0.5
        });
    }

    onDrainSanity() {
        if (this.playerSanity >= 400) {
            this.send('PLAY_AUDIO', {   
                audioKey: _getRandomFrom(this.whisper_nos),
                volume: 0.5
            });
        }
        else if (this.playerSanity >= 250) {
            this.send('PLAY_AUDIO', {   
                audioKey: _getRandomFrom(this.frustrated_nos),
                volume: 0.5
            });
        }
        else if (this.playerSanity >= 150) {
            this.send('PLAY_AUDIO', {   
                audioKey: _getRandomFrom(this.aggressive_nos),
                volume: 0.5
            });
        }
        
    }

    randomSanityEvent() {
        // if (Math.random() < 0.1) {
        //     this.send('PLAY_AUDIO', {   
        //         audioKey: 'whisper-1.mp3',
        //         volume: 0.5
        //     });
        // }
    }
}