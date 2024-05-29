import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'
import { Player } from './player'
import { Heart } from './heart'


const Resources = {
    Player: new ImageSource('images/player.png'),
    Enemy: new ImageSource ('images/enemy.png'),
    Background1: new ImageSource('images/background1.jpg'),
    Background2: new ImageSource('images/background2.png'),
    Bullet: new ImageSource('images/bullet.png'),
    Heart: new ImageSource('images/heart.png'),
    Key: new ImageSource('images/key.png'),
    PixelFont: new FontSource('fonts/myfont.otf', 'PressStart')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }