import Bomb from './Bomb';
import {playerProps} from "./PlayerProps";
import {isDead} from "./enemyHelper";

let timerId;

export default class Goblin {
    constructor(game) {
        this.game = game;
        this.bomb = null;
    }

    create() {
        for (const enemy of this.game.enemy.enemies.children.entries) {
            if (enemy.texture.key === 'hopHopGoblin') {
                enemy.setPushable(false);
                enemy.attack = 50;
                enemy.hp = 100;
                enemy.setBounce(.1);
                enemy.setOrigin(0);
                enemy.setSize(40, 50);
                enemy.setDepth(1)
                enemy.setCollideWorldBounds(true);
                enemy.name = 'hopHopGoblin'
            }
        }
    }

    playAliveEnemyAnimation(e) {
        e.play('hop_hop_goblin', true)
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

    update() {
        for (const enemy of this.game.enemy.enemies.children.entries) {
            if (enemy.name === 'hopHopGoblin') {
                const player = this.game.playerObject.player;
                if (player.x <= enemy.x) {
                    enemy.flipX = true;
                    enemy.direction = 'LEFT';
                } else {
                    enemy.flipX = false;
                    enemy.direction = 'RIGHT';
                }
                // this.throughBomb(enemy);
                !isDead(enemy) && this.playAliveEnemyAnimation(enemy)
            }
        }
    }

    fight(player, enemy) {
        const currentPlayerAnim = player.anims.currentAnim.key;
        const goblinBodyTouch = enemy.body.touching;
        // TODO fix touch
        console.log(goblinBodyTouch)
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
}
