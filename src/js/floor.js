import { Actor, Vector, CollisionType } from "excalibur";

export class Floor extends Actor {
    constructor(x, y, width, height) {
        super({
            pos: new Vector(x, y),
            width,
            height,
            collisionType: CollisionType.Fixed
        });
    }

    onInitialize(engine) {
    }
}
