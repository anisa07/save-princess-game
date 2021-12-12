import {isDead} from "./enemyHelper";
import Enemy from "./Enemy";
import {playerProps} from "../PlayerProps";
import EvilEnergy from "./EvilEnergy";

const timers = {

}

export default class Owl extends Enemy {
    constructor(game) {
        super(game, 'owl',
            { src: 'owlFly.png', frameWidth: 32, frameHeight: 32, frameRate: 10 },
            { direction: 'RIGHT', hitOnTouch: false }
        );
    }

    loadResources() {
        super.loadResources();
        this.game.load.spritesheet('owlAttack', '../src/assets/enemies/owlAttack.png', {frameWidth: 32, frameHeight: 32});
        this.game.load.spritesheet('owlHit', '../src/assets/enemies/owlHit.png', {frameWidth: 32, frameHeight: 32});
        this.game.load.spritesheet('evilEnergy', '../src/assets/enemies/evilEnergy.png', {frameWidth: 32, frameHeight: 32});
    }

    createResources() {
        super.createResources();
        this.game.anims.create({
            key: "owl_attack",
            frames: this.game.anims.generateFrameNumbers("owlAttack"),
            frameRate: 12,
            repeat: -1
        });

        this.game.anims.create({
            key: "owl_get_hit",
            frames: this.game.anims.generateFrameNumbers("owlHit"),
            frameRate: 6,
            repeat: 1
        });

        this.game.anims.create({
            key: "evil_energy",
            frames: this.game.anims.generateFrameNumbers("evilEnergy"),
            frameRate: 9,
            repeat: 1
        });
    }

    updateEnemy(enemy) {
        enemy.body.allowGravity = false;
        this.changeDirectionWhileBlocked(enemy);
        this.setVelocity(enemy);
        this.throwEnergy(enemy);
        this.whileAlive(enemy);
    }

    owlGetHit(e) {
        e.play('owl_get_hit', true);
        e.on('animationcomplete', () => {
            this.playAliveEnemyAnimation(e)
            e.direction === 'LEFT' ?  this.turnRight(e) : this.turnLeft(e);
        });
    }

    throwEnergy(enemy) {
        const key = `timerId${enemy.index}`;
        if (timers[key]) {
            return;
        }

        timers[key] = setTimeout(() => {
            this.energy = new EvilEnergy(this.game);
            this.energy.create(enemy.x, enemy.y, 'evil_energy', 'evilEnergy', enemy.attack, enemy.direction);
            this.energy.update();
            clearTimeout(timers[key]);
            timers[key] = undefined
        }, 1000);
    }
}
