import { Scene, Label, Color, Vector, Keys, FontUnit } from 'excalibur';
import { Resources } from '../resources';
import { Death } from '../death-BG';

export class DeathScene extends Scene {
    label;

    onInitialize() {
        const background = new Death(640, 360, 1280, 720);
        this.add(background);
        
        this.createLabel();
    }

    createLabel() {
        this.label = new Label({
            text: 'You died! \n Press Enter to respawn',
            pos: new Vector(400, 500),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.White
            })
        });
        this.label.anchor.setTo(0, 0);
        this.add(this.label);
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene('game');
        }
    }
}
