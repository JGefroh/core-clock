import { default as System } from '@core/system';

export default class GameOverSystem extends System {
    constructor() {
      super();
      this.startedAt = Date.now();
      this.gameOver = false;
    }
    
    work() {
        if (this.gameOver) {
            return;
        }

        if (this._core.getData('CURRENT_SANITY') <= 0) {
            this.setGameOver();
        }
    };

    setGameOver() {
        this.gameOver = true;
        this.send('STOP_EVENT');
        this.send('DISABLE_EVENTS');

        let survivedTime = this.getSurvivedMinutesAndSeconds(this.startedAt);
        this.send("ADD_GUI_RENDERABLE", {
            key: 'GAME_OVER',
            text: 'GAME OVER',
            xPosition: (window.innerWidth / 2) - 200,
            yPosition: window.innerHeight / 4 - 100,
            width: 1000,
            height: 500,
            fontSize: 50,
            fontColor: 'red'
        })
        this.send("ADD_GUI_RENDERABLE", {
            key: 'GAME_OVER_2',
            text: `You survived ${survivedTime}.`,
            xPosition: (window.innerWidth / 2) - 200,
            yPosition: window.innerHeight / 4 + -100 + 70,
            width: 1000,
            height: 500,
            fontSize: 24,
            fontColor: 'red'
        })

        setTimeout(() => {
            window.location.reload();
        }, 5000)
    }
    
    getSurvivedMinutesAndSeconds(startedAt) {
        let survivedTime = Date.now() - startedAt;
        let totalSeconds = Math.floor(survivedTime / 1000);
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;
        return `${minutes} minutes, ${seconds} seconds`;
    }
  }