import Bomb from './Bomb';
import {playerProps} from "./PlayerProps";
import {isDead} from "./enemyHelper";
import Enemy from "./Enemy";

let timerId;

export default class Goblin extends Enemy {
    constructor(game) {
        super(game, 'hopHopGoblin', 'hop_hop_goblin','evil_mashroom_die',
        {attack: 50, hp: 250, size: {x: 40, y: 50}});
        this.game = game;
        this.bomb = null;
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
        for (const enemy of this.getEnemies()) {
            const player = this.game.playerObject.player;
            if (player.x <= enemy.x) {
                enemy.flipX = true;
                enemy.direction = 'LEFT';
            } else {
                enemy.flipX = false;
                enemy.direction = 'RIGHT';
            }
            this.throughBomb(enemy);

            if (!isDead(enemy)) {
                this.playAliveEnemyAnimation(enemy)
            }
        }
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
}
