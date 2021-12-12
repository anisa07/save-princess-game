import Enemy from "./Enemy";

export default class Skeleton extends Enemy {
    constructor(game) {
        super(game, 'skeleton',
        { src: 'skeleton_move.png', frameWidth: 69, frameHeight: 58, frameRate: 6 },
        { followPlayer: true,
            dieAnimation: { src: 'skeleton_die.png', frameWidth: 61, frameHeight: 61, frameRate: 16 },
            shotAnimation: { src: 'thrown_sword.png', frameWidth: 61, frameHeight: 49, frameRate: 8,
                velocity: { x: 300, y: 0 }, startShot: 'middle', gravity: false, timeout: 3000 }
        }
        );
    }
}
