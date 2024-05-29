import { Actor, Vector, Color, Sprite, CollisionType } from 'excalibur';
import { Resources } from './resources';
import { Player } from './player';

export class Key extends Actor {
    ui;
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Heart.width / 8,  
            height: Resources.Heart.height / 8, 
            collisionType: CollisionType.Active
        });
    }

    onInitialize(engine) {
        const sprite = Resources.Key.toSprite();
        sprite.width = this.width;
        sprite.height = this.height;
        this.graphics.use(sprite);
    }

    onCollide(event) {
        if (event.other instanceof Player) {
            this.scene?.engine.goToScene('end')
            this.kill();
        }
    }
}
