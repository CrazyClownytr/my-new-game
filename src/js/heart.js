import { Actor, Vector, CollisionType } from 'excalibur';
import { Resources } from './resources';

export class Heart extends Actor {
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Heart.width / 14,  
            height: Resources.Heart.height / 14, 
            collisionType: CollisionType.Passive
        });
    }

    onInitialize(engine) {
        const sprite = Resources.Heart.toSprite();
        sprite.width = this.width;
        sprite.height = this.height;
        this.graphics.use(sprite);
    }

    onCollected(player) {
        player.increaseHealth(20);
    }
}
