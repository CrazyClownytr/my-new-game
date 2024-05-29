import { Scene, Label, Color, Vector, FontUnit, Keys } from 'excalibur';
import { Resources } from '../resources';

export class StartScene extends Scene {
    constructor() {
        super();
        this.labelText1 = new Label({
            text: 'Defeat the zombies,\ncollect the key,\nand claim victory!',
            pos: new Vector(400, 200), 
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.White
            })
        });

        this.labelText2 = new Label({
            text: 'Press Enter to Start',
            pos: new Vector(400, 500),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.White
            })
        });

        this.add(this.labelText1);
        this.add(this.labelText2);
    }

    onInitialize(engine) {
        this.positionText();
    }

    onPostUpdate(engine) {
        this.handleInput(engine);
    }

    positionText() {
        const screenWidth = this.engine.drawWidth;
        const screenHeight = this.engine.drawHeight;

        const textWidth = this.labelText1.width;
        const textHeight = this.labelText1.height;

        const posX = (screenWidth - textWidth) / 8;
        const posY = (screenHeight - textHeight) / 4;

        this.labelText1.pos = new Vector(posX, posY);
    }

    handleInput(engine) {
        if (engine.input.keyboard.isHeld(Keys.Enter)) {
            engine.goToScene('game');
        }
    }
}
