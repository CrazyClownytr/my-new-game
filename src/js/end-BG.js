import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";

export class End extends Actor {
    constructor(x, y, width, height) {
        super({
            x,y,
            width,
            height
        });

        const bgSprite = Resources.End.toSprite();
        this.graphics.use(bgSprite);

        z: -1;
    }

    onInitialize(engine) {
       
    }
}
