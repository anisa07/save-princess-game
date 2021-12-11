import Bomb from './Bomb';
import {playerProps} from "../PlayerProps";
import {isDead} from "./enemyHelper";
import Enemy from "./Enemy";

let timerId;

export default class Goblin extends Enemy {
    constructor(game) {
        super(game, 'hopHopGoblin', 'hop_hop_goblin','evil_mushroom_die',
        {attack: 50, hp: 250, size: {x: 40, y: 50}});
        this.game = game;
        this.bomb = null;
    }

    loadResources() {
        this.game.load.spritesheet('hopHopGoblin', '../src/assets/enemies/Goblin.png', {frameWidth: 150, frameHeight: 150})
        this.game.load.spritesheet('bigBomb', '../src/assets/enemies/Bomb.png', {frameWidth: 50, frameHeight: 50})
    }

    createResources() {
        this.game.anims.create({
            key: "hop_hop_goblin",
            frames: this.game.anims.generateFrameNumbers("hopHopGoblin"),
            frameRate: 10,
            repeat: -1
        });

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

    fight(player, enemy) {
        const currentPlayerAnim = player.anims.currentAnim.key;
        const goblinBodyTouch = enemy.body.touching;
        if(currentPlayerAnim === "player_attack") {
            enemy.hp -= playerProps.attack;
        } else if (goblinBodyTouch.up) {
            this.game.playerObject.lethalJump();
            enemy.hp = 0;
        }

        if (isDead(enemy)){
            enemy.destroy();
        }
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
