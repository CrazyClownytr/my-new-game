import { Scene, Label, Color, Vector, FontUnit, Keys } from 'excalibur';
import { Resources } from '../resources';
import { End } from '../end-BG';

export class EndScene extends Scene {
    label;

    onInitialize() {
        const background = new End(640, 360, 1280, 720);
        this.add(background);

        this.createLabel();
    }

    createLabel() {
        this.label = new Label({
            text: 'Congratulations!,\n You have secured the key.\n Press enter to play again',
            pos: new Vector(200, 300),
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
            engine.goToScene('start');
        }
    }
}
