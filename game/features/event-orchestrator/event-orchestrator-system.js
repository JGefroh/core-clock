import { default as System } from '@core/system';
import { default as Core } from '@core/core';
import { default as Entity } from '@core/entity.js';

export default class EventOrchestratorSystem extends System {
    constructor() {
        super();

        this.possibleEvents = {};
        this.overrideEvents = {};


        this.wait = 2000;
        this.nextEventTime = Date.now();

        this.addHandler('REGISTER_FX', (payload) => {
            this.addAsEvent(payload)
        })

        this.addHandler('FORCE_EVENT', (payload) => {
            this.runEvent();
        })
    }

    work() {
        if (Date.now() >= this.nextEventTime && Math.random() < 0.2) {
            this.runEvent();
        }
    }

    runEvent() {
        const event = this._getRandomEvent();
        console.info(event)
        if (event) {
            this.nextEventTime = Date.now() + event.minimumTimeMs ;
            let eventParams = { fxKey: event.fxKey, params: event.params() }
            this.send('EXECUTE_FX', eventParams);
        }
    }


    addAsEvent(payload) {
        this.possibleEvents[payload.getFxKey()] = {
            fxKey: payload.getFxKey(),
            sanity: 10,
            minimumTimeMs: 5000,
            params: () => {}
        };
        this.applyOverride()
    }

    applyOverride() {
        this.overrideEvents = {
            'FxClockVolumeChange': {
                fxKey: 'FxClockVolumeChange',
                sanity: 10,
                minimumTimeMs: 5000,
                params: () => { return {
                    volume: Math.random() * 1
                }}
            }
        }

        this.possibleEvents = {
            ...this.possibleEvents,
            ...this.overrideEvents
        };
    }

    _getRandomEvent() {
        const keys = Object.keys(this.possibleEvents);
        const randomKey = keys[Math.floor(Math.random() * keys.length)];
        return this.possibleEvents[randomKey];
    }
}