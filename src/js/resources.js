import { ImageSource, Sound, Resource, Loader } from 'excalibur'
import { Player } from './player'

// voeg hier jouw eigen resources toe
const Resources = {
    Player: new ImageSource('images/player.png'),
    Background1: new ImageSource('images/background1.jpg'),
    Background2: new ImageSource('images/background2.png')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }