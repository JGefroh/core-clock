import { default as System } from '@core/system';

export default class SceneConfigurationSystem extends System {
    constructor(config = {}) {
      super()
      this.send('SET_VIEWPORT', {xPosition: 0, yPosition: 0})
    }
}