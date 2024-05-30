import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";

export class Death extends Actor {
    constructor(x, y, width, height) {
        super({
            x,y,
            width,
            height
        });

        const bgSprite = Resources.Death.toSprite();
        this.graphics.use(bgSprite);

        z: -1;
    }

    onInitialize(engine) {
       
    }
}
