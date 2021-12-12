import Bomb from './Bomb';
import {playerProps} from "../PlayerProps";
import {isDead} from "./enemyHelper";
import Enemy from "./Enemy";

let timerId;

export default class Goblin extends Enemy {
    constructor(game) {
        super(game, 'hopHopGoblin',
            { src: 'Goblin.png', frameWidth: 150, frameHeight: 150, frameRate: 10 },
            {attack: 50, hp: 250, size: {x: 40, y: 50}, hitOnTouch: false}
        );
        this.bomb = null;
    }

    loadResources() {
        super.loadResources();
        this.game.load.spritesheet('bigBomb', '../src/assets/enemies/Bomb.png', {frameWidth: 50, frameHeight: 50})
    }

    createResources() {
        super.createResources();
        this.game.anims.create({
            key: "big_bomb",
            frames: this.game.anims.generateFrameNumbers("bigBomb"),
            frameRate: 10,
            repeat: 1
        });
    }

    updateEnemy(enemy) {
        this.turnToThePlayer(enemy);
        this.throughBomb(enemy);
        this.whileAlive(enemy)
    }

    throughBomb(enemy) {
        if (timerId) {
            return;
        }

        timerId = setTimeout(() => {
            const x = enemy.direction === 'LEFT' ? enemy.x : enemy.x + 100;
            this.bomb = new Bomb(this.game);
            this.bomb.create(x, enemy.y, 'big_bomb', 'goblinBomb', enemy.attack, enemy.direction);
            this.bomb.update();
            clearTimeout(timerId);
            timerId = undefined
        }, 1000);
    }
}
