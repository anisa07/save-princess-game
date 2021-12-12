import Enemy from "./Enemy";

let timerId;

export default class Goblin extends Enemy {
    constructor(game) {
        super(game, 'hopHopGoblin',
            { src: 'Goblin.png', frameWidth: 150, frameHeight: 150, frameRate: 10 },
            {attack: 50, hp: 250, movement: 'on_hold', followPlayer: true, size: {x: 40, y: 50}, hitOnTouch: false,
                shotAnimation: { src: 'Bomb.png', frameWidth: 50, frameHeight: 50, frameRate: 10,
                    velocity: { x: 100, y: 0 }, startShot: 'middle', gravity: true, timeout: 1500 }
            }
        );
        this.bomb = null;
    }
}
