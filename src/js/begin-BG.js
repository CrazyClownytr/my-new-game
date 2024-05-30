import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";

export class Begin extends Actor {
    constructor(x, y, width, height) {
        super({
            x,y,
            width,
            height
        });

        const bgSprite = Resources.Begin.toSprite();
        this.graphics.use(bgSprite);

        z: -1;
    }

    onInitialize(engine) {
       
    }
}
