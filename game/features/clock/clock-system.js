import { default as Entity } from '@core/entity.js'
import { default as System } from '@core/system';

import PositionComponent from '@game/engine/position/position-component';
import RenderComponent from '@game/engine/renderer/render-component';
import AttachedComponent from '../../engine/attachments/attached-component';

export default class ClockSystem extends System {
  constructor() {
    super();

    this.clockSize = window.innerHeight / 2;
    this.lastAdvanceTimestamp = performance.now();
    this.timeBetweenAdvancesMs = 1000; // Default advance interval
    this.clockVolume = 0.6;

    this.shouldTockTock = false;
    this.rotate = 0;

    this.lastPlayed = 'tock';

    this.addHandler('SET_CLOCK_SPEED', (payload) => {
      this.timeBetweenAdvancesMs = payload.ms;
    }); 

    this.addHandler('SET_CLOCK_VOLUME', (payload) => {
      this.clockVolume = payload.volume;
    }); 

    this.addHandler('REVERT_STATE', (payload) => {
    })

    this.addHandler('SET_CLOCK_TOCK_TOCK', (payload) => {
      this.shouldTockTock = payload.tocktock;
    })

    this.addHandler('SET_CLOCK_ROTATE', (payload) => {
      this.rotate = payload.direction;
      if (!payload.direction) {
        this._core.getEntityWithKey('clock-face').getComponent('PositionComponent').angleDegrees = 0;
      }
    })
  }

  initialize() {
    this.createClock();
    this.createHandHour();
    this.createHandMinute();
    this.createHandSecond();
    this.setToCurrentTime();
  }

  work() {
    this.advanceTime(1000)
  }

  reset() {
    this.timeBetweenAdvancesMs = 1000;
  }

  setToCurrentTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    this.setTime(hours, minutes, seconds);
  }

  advanceTime() {
    const now = performance.now();
    const elapsed = now - this.lastAdvanceTimestamp;

    if (elapsed >= this.timeBetweenAdvancesMs) {
      const steps = Math.floor(elapsed / this.timeBetweenAdvancesMs);
      this.lastAdvanceTimestamp += steps * this.timeBetweenAdvancesMs;

      const hourComponent = this._core.getEntityWithKey('clock-hour-hand-base').getComponent('PositionComponent');
      const minuteComponent = this._core.getEntityWithKey('clock-minute-hand-base').getComponent('PositionComponent');
      const secondComponent = this._core.getEntityWithKey('clock-second-hand-base').getComponent('PositionComponent');

      secondComponent.angleDegrees = (secondComponent.angleDegrees + 6 * steps) % 360;
      minuteComponent.angleDegrees = (minuteComponent.angleDegrees + (6 / 60) * steps) % 360;
      hourComponent.angleDegrees = (hourComponent.angleDegrees + (30 / 3600) * steps) % 360;

      let soundToPlay = this.lastPlayed == 'tick' ? 'tock.mp3' : 'tick.mp3';

      this.send("PLAY_AUDIO", {
        audioKey: this.shouldTockTock ? `${this.lastPlayed}.mp3` : soundToPlay,
        volume: this.clockVolume,
        endAt: 0.2
      })
      if (!this.shouldTockTock) {
        this.lastPlayed = (this.lastPlayed == 'tick' ? 'tock' : 'tick');
      }
      if (this.rotate) {
        this._core.getEntityWithKey('clock-face').getComponent('PositionComponent').angleDegrees += (this.rotate * 3)
      }
    }
  }


  setTime(hours, minutes, seconds) {
    hours = hours % 12;
    minutes = minutes % 60;
    seconds = seconds % 60;

    const hourAngle = (hours * 30) + (minutes / 60) * 30;
    const minuteAngle = minutes * 6;
    const secondAngle = seconds * 6;

    this._core.getEntityWithKey('clock-hour-hand-base').getComponent('PositionComponent').angleDegrees = hourAngle;
    this._core.getEntityWithKey('clock-minute-hand-base').getComponent('PositionComponent').angleDegrees = minuteAngle;
    this._core.getEntityWithKey('clock-second-hand-base').getComponent('PositionComponent').angleDegrees = secondAngle;
  }

  /// Entity Generation

  createClock() {
    let entity = new Entity({key: 'clock-face'})
    let width = this.clockSize;
    let height = width;
    let xPosition = 0;
    let yPosition = 0;
    let angleDegrees = 0;
    entity.addComponent(new PositionComponent(
        {
            width: width,
            height: height,
            xPosition: xPosition,
            yPosition: yPosition,
            angleDegrees: angleDegrees
        }
    ));
    entity.addComponent(new RenderComponent({
        width: width,
        height: height,
        shape: 'circle',
        shapeColor: 'rgba(255,255,255,1)',
        renderLayer: 'PROP',
        imagePath: 'CLOCK_FACE'
    }))
    this._core.addEntity(entity);
  }

  createHandHour() {
    let width = 10;
    let height = this.clockSize * 0.4
    let xPosition = 0;
    let yPosition = 0;


    let baseEntity = new Entity({key: 'clock-hour-hand-base'});
    baseEntity.addComponent(new PositionComponent(
        {
            width: width,
            height: height,
            xPosition: xPosition,
            yPosition: yPosition,
            angleDegrees: Math.random() * 360
        }
    ));
    this._core.addEntity(baseEntity);


    let handEntity = new Entity()
    handEntity.addComponent(new PositionComponent(
        {
            width: width,
            height: height,
            xPosition: xPosition,
            yPosition: yPosition,
            angleDegrees: Math.random() * 360
        }
    ));
    handEntity.addComponent(new RenderComponent({
        width: width,
        height: height,
        shape: 'rectangle',
        shapeColor: 'rgba(0,255,0,1)',
        renderLayer: 'PROP',
        renderAlignment: 'center'
    }))

    handEntity.addComponent(new AttachedComponent({
        attachedToEntity: baseEntity, sync: ['xPosition', 'yPosition', 'angleDegrees'], attachmentOptions: {xPosition: 0, yPosition: -height / 2, angleDegrees: 0}
    }))
    this._core.addEntity(handEntity);
  }

  createHandMinute() {
    let width = 5;
    let height = this.clockSize * 0.4
    let xPosition = 0;
    let yPosition = 0;


    let baseEntity = new Entity({key: 'clock-minute-hand-base'});
    baseEntity.addComponent(new PositionComponent(
        {
            width: width,
            height: height,
            xPosition: xPosition,
            yPosition: yPosition,
            angleDegrees: Math.random() * 360
        }
    ));
    this._core.addEntity(baseEntity);


    let handEntity = new Entity()
    handEntity.addComponent(new PositionComponent(
        {
            width: width,
            height: height,
            xPosition: xPosition,
            yPosition: yPosition,
            angleDegrees: Math.random() * 360
        }
    ));
    handEntity.addComponent(new RenderComponent({
        width: width,
        height: height,
        shape: 'rectangle',
        shapeColor: 'rgba(255,0,255,1)',
        renderLayer: 'PROP',
        renderAlignment: 'center'
    }))

    handEntity.addComponent(new AttachedComponent({
        attachedToEntity: baseEntity, sync: ['xPosition', 'yPosition', 'angleDegrees'], attachmentOptions: {xPosition: 0, yPosition: -height / 2, angleDegrees: 0}
    }))
    this._core.addEntity(handEntity);
  }

  createHandSecond() {
    let width = 5;
    let height = this.clockSize * 0.4;
    let xPosition = 0;
    let yPosition = 0;


    let baseEntity = new Entity({key: 'clock-second-hand-base'});
    baseEntity.addComponent(new PositionComponent(
        {
            width: 30,
            height: 30,
            xPosition: xPosition,
            yPosition: yPosition,
        }
    ));
    baseEntity.addComponent(new RenderComponent({
        width: 30,
        height: 30,
        shape: 'circle',
        shapeColor: 'rgba(255,0,0,1)',
        renderLayer: 'PROP',
        renderAlignment: 'center',
    }))
    this._core.addEntity(baseEntity);


    let handEntity = new Entity()
    handEntity.addComponent(new PositionComponent(
        {
            width: width,
            height: height,
            xPosition: xPosition,
            yPosition: yPosition,
            angleDegrees: Math.random() * 360
        }
    ));
    handEntity.addComponent(new RenderComponent({
        width: width,
        height: height,
        shape: 'rectangle',
        shapeColor: 'rgba(255,0,0,1)',
        renderLayer: 'PROP',
        renderAlignment: 'center',
    }))

    handEntity.addComponent(new AttachedComponent({
        attachedToEntity: baseEntity, sync: ['xPosition', 'yPosition', 'angleDegrees'], attachmentOptions: {xPosition: 0, yPosition: -height / 2, angleDegrees: 0}
    }))
    this._core.addEntity(handEntity);
  }
}