import Enemy from "./Enemy";

export default class Owl extends Enemy {
    constructor(game) {
        super(game, 'owl',
            { src: 'owlFly.png', frameWidth: 32, frameHeight: 32, frameRate: 10 },
            { direction: 'RIGHT', movement: 'fly', hitOnTouch: false,
                shotAnimation: { src: 'evilEnergy.png', frameWidth: 32, frameHeight: 32, frameRate: 9,
                    velocity: { x: 0, y: 0 }, startShot: 'bottom', gravity: true, timeout: 1500
            }
            }
        );
    }

    //
    // loadResources() {
    //     super.loadResources();
    //     this.game.load.spritesheet('owlAttack', '../src/assets/enemies/owlAttack.png', {frameWidth: 32, frameHeight: 32});
    //     this.game.load.spritesheet('owlHit', '../src/assets/enemies/owlHit.png', {frameWidth: 32, frameHeight: 32});
    // }
    //
    // createResources() {
    //     super.createResources();
    //     this.game.anims.create({
    //         key: "owl_attack",
    //         frames: this.game.anims.generateFrameNumbers("owlAttack"),
    //         frameRate: 12,
    //         repeat: -1
    //     });
    //
    //     this.game.anims.create({
    //         key: "owl_get_hit",
    //         frames: this.game.anims.generateFrameNumbers("owlHit"),
    //         frameRate: 6,
    //         repeat: 1
    //     });
    // }
    //
    // owlGetHit(e) {
    //     e.play('owl_get_hit', true);
    //     e.on('animationcomplete', () => {
    //         this.playAliveEnemyAnimation(e)
    //         e.direction === 'LEFT' ?  this.turnRight(e) : this.turnLeft(e);
    //     });
    // }
}
