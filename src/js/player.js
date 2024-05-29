import { Actor, Vector, Keys, clamp, CollisionType } from "excalibur";
import { Resources } from "./resources";
import { Floor } from "./floor";
import { Bullet } from "./bullet";

export class Player extends Actor {
    sprite;
    isGrounded;
    jumpSpeed;
    gravity;

    constructor(x, y) {
        super({
            pos: new Vector(x, y),
            width: Resources.Player.width / 2,
            height: Resources.Player.height / 2,
            collisionType: CollisionType.Active
        });
        this.isGrounded = false;
        this.jumpSpeed = -600;
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
        this.scale = new Vector(0.7, 0.7);

        this.vel = new Vector(0, 0);
        this.on("exitviewport", (event) => this.resetPosition(event));

        //  collision handler
        this.on("precollision", (evt) => {
            if (evt.other instanceof Floor) {
                this.isGrounded = true;
                this.vel.y = 0;
            }
        });
    }

    resetPosition(event) {
        this.pos = new Vector(400, 100);
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = this.vel.y;

       
        yspeed += this.gravity * delta / 1000;

        if (engine.input.keyboard.isHeld(Keys.W) || engine.input.keyboard.isHeld(Keys.Up)) {
            if (this.isGrounded) {
                yspeed = this.jumpSpeed;
                this.isGrounded = false;
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

        if (engine.input.keyboard.wasPressed(Keys.Space)) {
            this.shootBullet(engine);
        }

        this.vel = new Vector(xspeed, yspeed);
    }

    onPostUpdate(engine, delta) {
       
        this.pos = this.pos.add(this.vel.scale(delta / 1000));

        
        this.pos.x = clamp(this.pos.x, 0, engine.drawWidth - this.width);
        this.pos.y = clamp(this.pos.y, 0, engine.drawHeight - this.height);

        this.isGrounded = false;
    }

    shootBullet(engine) {
        const bullet = new Bullet(this.pos.x, this.pos.y);
        engine.add(bullet);
    }
}
