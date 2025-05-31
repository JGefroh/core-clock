import { default as System } from '@core/system';
import { default as Core}  from '@core/core';
import { default as Entity } from '@core/entity.js'

export default class EventOrchestratorSystem extends System {
    constructor() {
        super()
        this.send('EXECUTE_FX', {fxKey: 'FxTimeSpeedUp'})
    }
  }