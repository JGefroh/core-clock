import { default as Core } from '@core/core';
import { default as Entity } from '@core/entity.js';
import { default as System } from '@core/system';

export default class PlayerControlIntentSystem extends System {
    constructor() {
        super()

        this.addHandler('INPUT_RECEIVED', (payload) => {
            if (payload.action == 'pay_attention') {
                this.payAttention();
            }
        });
    }

    work() {
    }

    payAttention() {
        this.send('STOP_EVENT');
    }
}