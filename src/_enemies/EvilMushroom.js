import Enemy from "./Enemy";

export default class EvilMushroom extends Enemy {
    constructor(game) {
        super(game, 'evilMushroom',
        { src: 'evil_mushroom.png', frameWidth: 60, frameHeight: 65, frameRate: 13 },
        { src: 'evil_mushroom_die.png', frameWidth: 50, frameHeight: 50, frameRate: 20 },
        );
    }
}
