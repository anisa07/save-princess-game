import Enemy from "./Enemy";

export default class Skeleton extends Enemy {
    constructor(game) {
        super(game, 'skeleton',
        { src: 'skeleton_move.png', frameWidth: 69, frameHeight: 58, frameRate: 6 },
        { src: 'skeleton_die.png', frameWidth: 61, frameHeight: 61, frameRate: 16 },
        );
    }

    updateEnemy(enemy, layers) {
        super.updateEnemy(enemy, layers);
        this.throwSword();
    }

    throwSword() {

    }
}
