import { Actor, Vector, Keys, clamp, CollisionType } from "excalibur";
import { Resources } from "./resources";
import { Floor } from "./floor";
import { Bullet } from "./bullet";
import { Enemy } from "./enemy";
import { Heart } from "./heart";
import { Key } from "./key";

export class Player extends Actor {
    sprite;
    isGrounded;
    jumpSpeed;
    gravity;
    lives;
    keys;
    health;
    maxHealth;
    ui;
    

    constructor(x, y, ui) {
        super({
            pos: new Vector(x, y),
            width: Resources.Player.width / 2,
            height: Resources.Player.height / 2,
            collisionType: CollisionType.Active
        });
        this.isGrounded = false;
        this.jumpSpeed = -600;
        this.gravity = 1000;
        this.lives = 3;
        this.keys = 0;
        this.score = 0;
        this.maxHealth = 100;
        this.health = this.maxHealth;
        this.ui = ui;
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
        this.on("exitviewport", () => this.resetPosition());

        this.on("precollision", (event) => {
            if (event.other instanceof Floor) {
                this.isGrounded = true;
                this.vel.y = 0;
            }
            if (event.other instanceof Enemy) {
                this.handleEnemyCollision(event.other);
            }
            if (event.other instanceof Heart) {
                this.handleHeartcollison(event.other);
            }
            if (event.other instanceof Key) {
                this.collectKey(event.other);
            }
        });

        this.on("collisionstart", (event) => this.onCollide(event));
    }

    onCollide(event) {
        if (event.other instanceof Enemy) {
            this.takeDamage(10);
        }
    }

    increaseLife() {
        this.lives++;
        console.log('Lives:', this.lives);
    }

    decreaseLife() {
        this.lives--;
        console.log('Lives:', this.lives);
        if (this.lives <= 0) {
            this.kill();
            console.log('Player killed');
        }
    }

    handleEnemyCollision(enemy) {  
        this.takeDamage(5);
    }
    
    takeDamage(amount) {
        this.health -= amount;
        console.log(`Player health: ${this.health}`);
        if (this.ui) {
            this.ui.updateHealth(this.health);
        }
        if (this.health <= 0) {
            this.die();
            this.kill()
        }
    }

    die() {
        console.log("Player died!");
        this.scene?.engine.goToScene('death');
    }
    

    handleHeartcollison(heart) {
        heart.kill();  
        this.health += 20;
        this.health = Math.min(this.health, this.maxHealth);
        if (this.ui) {
            this.ui.updateHealth(this.health);
        }
        console.log('i am healed!')
    }
    

    collectKey(key) {
        key.kill();
        this.score += 100
        this.ui.updateScore(100);
        console.log('Score:', this.score);
        this.scene?.engine.goToScene('end');
    }

    resetPosition() {
        this.pos = new Vector(400, 100);
    }

    onPreUpdate(engine, delta) {
        let xspeed = 0;
        let yspeed = this.vel.y;

        yspeed += this.gravity * (delta / 1000); 

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
        const bullet = new Bullet(this.pos.x + this.width / 2, this.pos.y);
        engine.add(bullet);
    }
}
