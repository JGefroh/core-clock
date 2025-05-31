import { default as Entity } from '@core/entity.js'
import { default as System } from '@core/system';

import PositionComponent from '@game/engine/position/position-component';
import RenderComponent from '@game/engine/renderer/render-component';
import AttachedComponent from '../../engine/attachments/attached-component';

export default class ClockSystem extends System {
  constructor() {
    super();
  }

  initialize() {
    this.createClock();
    this.createHandHour();
    this.createHandMinute();
    this.createHandSecond();
  }

  work() {
    this._core.getEntityWithKey('clock-hour-hand-base').getComponent('PositionComponent').angleDegrees+=1;
    this._core.getEntityWithKey('clock-minute-hand-base').getComponent('PositionComponent').angleDegrees+=1;
    this._core.getEntityWithKey('clock-second-hand-base').getComponent('PositionComponent').angleDegrees+=1;
  }

  createClock() {
    let entity = new Entity()
    let width = window.innerWidth / 2;
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
        renderLayer: 'PROP'
    }))
    this._core.addEntity(entity);
  }

  createHandHour() {
    let width = 10;
    let height = window.innerHeight / 2.5;
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
        attachedToEntity: baseEntity, sync: ['xPosition', 'yPosition', 'angleDegrees'], attachmentOptions: {xPosition: 0, yPosition: height / 2, angleDegrees: 0}
    }))
    this._core.addEntity(handEntity);
  }

  createHandMinute() {
    let width = 5;
    let height = window.innerHeight / 2.5;
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
        attachedToEntity: baseEntity, sync: ['xPosition', 'yPosition', 'angleDegrees'], attachmentOptions: {xPosition: 0, yPosition: height / 2, angleDegrees: 0}
    }))
    this._core.addEntity(handEntity);
  }

  createHandSecond() {
    let width = 5;
    let height = window.innerHeight / 2.5;
    let xPosition = 0;
    let yPosition = 0;


    let baseEntity = new Entity({key: 'clock-second-hand-base'});
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
        shapeColor: 'rgba(255,0,0,1)',
        renderLayer: 'PROP',
        renderAlignment: 'center'
    }))

    handEntity.addComponent(new AttachedComponent({
        attachedToEntity: baseEntity, sync: ['xPosition', 'yPosition', 'angleDegrees'], attachmentOptions: {xPosition: 0, yPosition: height / 2, angleDegrees: 0}
    }))
    this._core.addEntity(handEntity);
  }
}