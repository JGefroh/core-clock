import { default as System } from '@core/system';
import { default as Core}  from '@core/core';
import { default as Entity } from '@core/entity.js'

export default class InputConfigurationSystem extends System {
    constructor() {
        super()
        this.keyMap = {
            ' _release': 'pay_attention',

            // Viewport Contrlols - Debug
            '=_press': 'main_viewport_zoom_in',
            '-_press': 'main_viewport_zoom_out',
            '=_hold': 'main_viewport_zoom_in',
            '-_hold': 'main_viewport_zoom_out',
            'j_press': 'move_viewport_left',
            'j_hold': 'move_viewport_left',
            'l_press': 'move_viewport_right',
            'l_hold': 'move_viewport_right',
            'k_press': 'move_viewport_down',
            'k_hold': 'move_viewport_down',
            'i_press': 'move_viewport_up',
            'i_hold': 'move_viewport_up'
        };
    }
    
    work() {
        if (!this._core.getData('CONFIG_KEYS')) {
            this._core.publishData('CONFIG_KEYS', this.keyMap)
        }
    };
  }