import { Actor, Vector } from "excalibur";
import { Enemy } from "./enemy";
import { Resources } from "./resources";

export class Bullet extends Actor {
    constructor(x, y) {
        super({ x, y });
        this.on("collisionstart", (event) => this.onCollide(event));
        this.speed = 100;
    }

    onInitialize(engine) {
        console.log("shooting");

        // Initialiseer de sprite hier
        const bulletSprite = Resources.Bullet.toSprite();

        // Schaal de sprite op basis van de grootte van de resource
        bulletSprite.scale = new Vector(
            this.width / bulletSprite.width,
            this.height / bulletSprite.height
        );

        // Voeg de sprite toe aan de grafische componenten van de acteur
        this.graphics.add(bulletSprite);
    }

    onPreUpdate(engine) {
        
        this.pos.x += this.speed * engine.deltaTime / 1000;
        
       
        if (this.pos.x > engine.drawWidth) {
            this.kill();
        }
    }

    onCollide(event) {
        if (event.other instanceof Enemy) {
            event.other.hitByBullet();
            this.kill(); 
        }
    }
}
