import { Scene, Label, Color, Vector, Keys, FontUnit } from 'excalibur';
import { Resources } from '../resources';

export class DeathScene extends Scene {
    label;

    onInitialize() {
        this.createLabel();
    }

    createLabel() {
        this.label = new Label({
            text: 'You died! \n Press Enter to respawn',
            pos: new Vector(640, 360),
            font: Resources.PixelFont.toFont({
                unit: FontUnit.Px,
                size: 50,
                color: Color.White
            })
        });
        this.label.anchor.setTo(0.5, 0.5);
        this.add(this.label);
    }

    onPreUpdate(engine) {
        if (engine.input.keyboard.wasPressed(Keys.Enter)) {
            engine.goToScene('game');
        }
    }
}
