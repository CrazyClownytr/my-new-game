import { Scene, Label, Color, Vector, FontUnit, Input, Keys } from 'excalibur';
import { Resources } from '../resources';
import { StartScene } from './begin';

export class EndScene extends Scene {
    endText = new Label({
        text: 'Congratulations!, \n You have secured the key. \n Press enter to restart',
        pos: new Vector(0, 0), 
        font: Resources.PixelFont.toFont({
            unit: FontUnit.Px,
            size: 30,
            color: Color.White
        })
    });

    constructor() {
        super();
        this.add(this.endText);
    }

    onInitialize(engine) {
        this.positionText(engine);

        this.on('postupdate', () => {
            this.handleInput(engine);
        });
    }

    positionText(engine) {
        this.endText.pos = new Vector(engine.halfDrawWidth, engine.halfDrawHeight);
    }

    handleInput(engine) {
        if (engine.input.keyboard.isHeld(Keys.Enter)) {
            this.clear()
            this.engine.goToScene('start');
            
        }
    }
}
