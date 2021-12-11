import Enemy from "./Enemy";

export default class Skeleton extends Enemy {
    constructor(game) {
        super(game, 'skeleton', 'skeleton','skeleton_die');
    }

    updateEnemy(enemy, layers) {
        super.updateEnemy(enemy, layers);
        this.throwSword();
    }

    throwSword() {

    }

    loadResources() {
        this.game.load.spritesheet(this.animation, '../src/assets/enemies/skeleton_move.png', {frameWidth: 69, frameHeight: 58});
        this.game.load.spritesheet(this.dieAnimation, '../src/assets/enemies/skeleton_die.png', {frameWidth: 61, frameHeight: 61});
    }

    createResources() {
        this.game.anims.create({
            key: this.animation,
            frames: game.anims.generateFrameNumbers(this.animation),
            frameRate: 6,
            repeat: -1
        });

        this.game.anims.create({
            key: this.dieAnimation,
            frames: game.anims.generateFrameNumbers(this.dieAnimation),
            frameRate: 16,
            repeat: 1
        });
    }
}
