import { default as System } from '@core/system';
import { default as Core}  from '@core/core';
import { default as Entity } from '@core/entity.js'

import FxTimeSpeedUp from "../../features/fx/clock-fx/fx-time-speed-up"
export default class FxConfigurationSystem extends System {
    constructor() {
        super()

        this.send('REGISTER_FX', FxTimeSpeedUp);
    }
  }