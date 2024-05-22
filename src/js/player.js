
import { Actor, Vector, Keys, clamp, CollisionType, hasOnPostUpdate } from "excalibur";
import { Resources } from "./resources";

export class Player extends Actor {
   
   sprite
    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Player.width / 2,
            height: Resources.Player.height / 2,
            collisionType: CollisionType.Active
        });
        this.isGrounded = false;
        this.jumpSpeed = -400;
        this.gravity = 1000; 
    }

    onInitialize(engine) {
        console.log("Player created");

        this.sprite = Resources.Player.toSprite();
        this.sprite.scale = new Vector(
            this.width / Resources.Player.width,
            this.height / Resources.Player.height
        );

        this.graphics.use(this.sprite);
        this.scale = new Vector(0.7, 0.7)

        this.vel = new Vector(0, 0);
        this.on("exitviewport", (event) => this.resetPosition(event));
    }

   

    resetPosition(event) {
        this.pos = new Vector(400, 100);
    }

    onPreUpdate(engine) {
        let xspeed = 0;
        let yspeed =  this.vel.y;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            if (this.isGrounded) {
                yspeed = this.jumpSpeed; 
                this.isGrounded = true;
            }
        }

        if (engine.input.keyboard.isHeld(Keys.D) || engine.input.keyboard.isHeld(Keys.Right)) {
            xspeed = 200;
            this.sprite.flipHorizontal = true;
        }

        if (engine.input.keyboard.isHeld(Keys.A) || engine.input.keyboard.isHeld(Keys.Left)) {
            xspeed = -200;
            this.sprite.flipHorizontal = false;
        }

        this.vel = new Vector(xspeed, yspeed);
    }
    OnPostUpdate(engine) {
        if (this.pos.y >= 700 - this.height) {  
            this.pos.y = 700 - this.height; 
            this.vel.y = 0;  
            this.isGrounded = true;
        }
    }
}