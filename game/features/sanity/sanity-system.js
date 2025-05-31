import { default as Core } from '@core/core';
import { default as Entity } from '@core/entity.js';
import { default as System } from '@core/system';

export default class SanitySystem extends System {
    constructor() {
        super()

        this.playerSanity = 1000;
        this.wait = 1000;
    }

    work() {
        let drain = this._core.getData('CURRENT_EVENT_SANITY_DRAIN');
        if (drain >= 0) {
            this.playerSanity -= drain;
        }
        this._core.publishData('CURRENT_SANITY', this.playerSanity)
    }
}