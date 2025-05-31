import { default as System } from '@core/system';
import { default as Core}  from '@core/core';
import { default as Entity } from '@core/entity.js'

import FxTimeSpeedUp from "../../features/fx/clock-fx/fx-time-speed-up"
import FxTimeSpeedDown from '../../features/fx/clock-fx/fx-time-speed-down';
import FxTimeStop from '../../features/fx/clock-fx/fx-time-stop';
import FxClockVolumeChange from '../../features/fx/clock-fx/fx-clock-volume-change';
import FxZoomIn from '../../features/fx/clock-fx/fx-zoom-in';
import FxZoomOut from '../../features/fx/clock-fx/fx-zoom-out';
import FxClockTockTock from '../../features/fx/clock-fx/fx-clock-tock-tock';
import FxClockRotate from '../../features/fx/clock-fx/fx-clock-rotate';

export default class FxConfigurationSystem extends System {
    constructor() {
        super()

        this.send('REGISTER_FX', FxTimeSpeedUp);
        this.send('REGISTER_FX', FxTimeSpeedDown);
        this.send('REGISTER_FX', FxTimeStop);
        this.send('REGISTER_FX', FxClockVolumeChange);
        this.send('REGISTER_FX', FxZoomIn); 
        this.send('REGISTER_FX', FxZoomOut); 
        this.send('REGISTER_FX', FxClockTockTock);
        this.send('REGISTER_FX', FxClockRotate);
        // this.send('FORCE_EVENT');
    }
  }