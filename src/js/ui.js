import { Actor, Color, FontUnit, Label, ScreenElement, Vector } from "excalibur";
import { Resources } from "./resources";

export class UI extends ScreenElement {
    scoreText;
    healthbar;
    score;
    maxHealth = 100;
    currentHealth;
    plusTwenty;

    constructor() {
        super();
        this.score = 0;
        this.currentHealth = this.maxHealth;
    }

    onInitialize(engine) {
        this.scoreText = new Label({
            text: 'Score: 0',
            pos: new Vector(0, 0),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.Black
            })
        });
        this.addChild(this.scoreText);

        let barbackground = new Actor({
            x: 10, 
            y: 50, 
            color: Color.fromRGB(255, 255, 255, 0.4), 
            width: 200, 
            height: 20, 
            anchor: Vector.Zero
        });
        this.addChild(barbackground);

        this.healthbar = new Actor({
            x: 10, 
            y: 50, 
            color: Color.Green, 
            width: 200, 
            height: 20, 
            anchor: Vector.Zero
        });
        this.addChild(this.healthbar);

        this.plusTwenty = new Actor({
            x: engine.halfDrawWidth,
            y: engine.halfDrawHeight,
            anchor: Vector.Half,
            opacity: 1, 
            scale: Vector.Zero
        });

        const plusTwentyLabel = new Label({
            text: "+20",
            pos: new Vector(400, 300),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.Black
            })
        });

        this.plusTwenty.addChild(plusTwentyLabel);
        this.addChild(this.plusTwenty);

       
        engine.on('heartcollected', () => {
            this.showPlusTwenty();
            setTimeout(() => {
                this.hidePlusTwenty();
            }, 2000); 
        });
    }

    updateScore(points) {
        this.score += points;
        this.scoreText.text = `Score: ${this.score}`;
    }

    updateHealth(newHealth) {
        this.currentHealth = newHealth;
        let healthPercentage = this.currentHealth / this.maxHealth;
        this.healthbar.scale.x = healthPercentage;
    }

    showPlusTwenty() {
        this.plusTwenty.scale = Vector.One; 
    }

    hidePlusTwenty() {
        this.plusTwenty.scale = Vector.Zero;
    }
}
