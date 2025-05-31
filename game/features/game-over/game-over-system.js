import { default as System } from '@core/system';

export default class GameOverSystem extends System {
    constructor() {
      super();
    }
    
    work() {
        if (this._core.getData('CURRENT_SANITY') <= 0) {
            this.send("ADD_GUI_RENDERABLE", {
                key: 'GAME_OVER',
                text: 'GAME OVER',
                xPosition: (window.innerWidth / 2) - 300,
                yPosition: window.innerHeight / 4,
                width: 1000,
                height: 500,
                fontSize: 50,
                fontColor: 'red'
            })
            setTimeout(() => {
                window.location.reload()
            }, 5000)
        }
    };
  }