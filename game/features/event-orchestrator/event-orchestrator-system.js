import { default as System } from '@core/system';
import { default as Core } from '@core/core';
import { default as Entity } from '@core/entity.js';

export default class EventOrchestratorSystem extends System {
    constructor() {
        super();

        this.possibleEvents = {
            'FxTimeSpeedUp': {
                fxKey: 'FxTimeSpeedUp',
                sanity: 10,
                minimumTimeMs: 5000
            },
            'FxTimeSpeedDown': {
                fxKey: 'FxTimeSpeedDown',
                sanity: 10,
                minimumTimeMs: 5000
            }
        };

        this.wait = 2000;
        this.nextEventTime = Date.now();
    }

    work() {
        if (Date.now() >= this.nextEventTime && Math.random() < 0.10) {
            const event = this._getRandomEvent();
            if (event) {
                this.nextEventTime = Date.now() + event.minimumTimeMs ;
                this.send('EXECUTE_FX', { fxKey: event.fxKey });
            }
        }
    }

    _getRandomEvent() {
        const keys = Object.keys(this.possibleEvents);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return this.possibleEvents[randomKey];
    }
}