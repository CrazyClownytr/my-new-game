import { Actor, Vector, CollisionType } from "excalibur";
import { Resources } from "./resources";

export class BG extends Actor {
    constructor(x, y, width, height) {
        super({
            x,y,
            width,
            height
        });

        const bgSprite = Resources.Background1.toSprite();
        this.graphics.use(bgSprite);
    }

    onInitialize(engine) {
       
    }
}
