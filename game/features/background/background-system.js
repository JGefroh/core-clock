import { default as Entity } from '@core/entity.js'
import { default as System } from '@core/system';

import PositionComponent from '@game/engine/position/position-component';
import RenderComponent from '@game/engine/renderer/render-component';
import AttachedComponent from '../../engine/attachments/attached-component';

export default class BackgroundSystem extends System {
  constructor() {
    super();

  }

  initialize() {
    this.addBackground();
    this.addBulletinBoard();
    this.addFilingCabinet();
  }

  work() {
  }

  addBackground() {
    let entity = new Entity({key: 'background'})
    let width = window.innerWidth * 2;
    let height = window.innerHeight * 2;
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
        shape: 'rectangle',
        shapeColor: 'rgba(176,170,158,1)',
        renderLayer: 'PROP',
    }))
    this._core.addEntity(entity);
  }

  addBulletinBoard() {
    this.send('CREATE_PROP', {
        type: 'BULLETIN_BOARD',
        xPosition: -(window.innerWidth / 2),
        yPosition: 0,
        width: 964 * .7, 
        height: 1265 * .7, 
      });
  }

  addFilingCabinet() {
    let width = 415;
    let height = 886;
    let ratio = width / height;
    this.send('CREATE_PROP', {
        type: 'FILING_CABINET',
        xPosition: window.innerWidth / 3,
        yPosition: 300,
        width: width, 
        height: width/ratio, 
      });
  }
}