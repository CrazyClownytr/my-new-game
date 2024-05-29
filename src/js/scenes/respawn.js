import { Scene, Label, Color, TextAlign, Input, Keys, FontUnit, Vector } from 'excalibur';
import { Resources } from '../resources';

export class DeathScene extends Scene {
    constructor(engine) {
        super();
    }

    onInitialize() {
        this.createLabel();
    }

    createLabel() {
        const label = new Label({
            text: 'You died! Press Enter to respawn',
            pos: new Vector(0, 0), 
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.White
            })
        });
        this.add(label);
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            
            engine.goToScene('start');
        }
    }
}
