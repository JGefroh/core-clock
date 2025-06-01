import { default as System } from '@core/system';

export default class SceneConfigurationSystem extends System {
    constructor(config = {}) {
      super()
      this.send('SET_VIEWPORT', {xPosition: -window.innerWidth / 7, yPosition: 0})
    }
}