import {isDead} from "./enemyHelper";
import Enemy from "./Enemy";
import {playerProps} from "../PlayerProps";
import EvilEnergy from "./EvilEnergy";

const timers = {

}

export default class Owl extends Enemy {
    constructor(game) {
        super(game, 'owl', 'owl_fly','evil_mashroom_die', {
            direction: 'RIGHT'
            }
        )
        this.game = game;
    }

    throughEnergy(enemy, index) {
        const key = `timerId${index}`;
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

    update() {
        for (const [index, enemy] of (this.getEnemies()).entries()) {
            enemy.body.allowGravity = false;

            if (enemy.body.blocked.left) {
                this.turnRight(enemy)
            }

            if (enemy.body.blocked.right) {
                this.turnLeft(enemy)
            }

            if (enemy.direction === 'RIGHT') {
                enemy.setVelocityX(50);
            } else {
                enemy.setVelocityX(-50);
            }

            this.throughEnergy(enemy, index);

            if (!isDead(enemy)) {
                this.playAliveEnemyAnimation(enemy)
            }
        }
    }

    fight(player, enemy) {
        const currentPlayerAnim = player.anims.currentAnim.key;
        const owlBodyTouch = enemy.body.touching;

        if(currentPlayerAnim === "player_attack") {
            this.owlGetHit(enemy)
            enemy.hp -= playerProps.attack;
        } else if (owlBodyTouch.up) {
            this.game.playerObject.lethalJump();
            enemy.hp = 0;
        }

        if (isDead(enemy)){
            enemy.destroy();
        }
    }

    owlGetHit(e) {
        e.play('owl_get_hit', true);
        e.on('animationcomplete', () => {
            this.playAliveEnemyAnimation(e)
            e.direction === 'LEFT' ?  this.turnRight(e) : this.turnLeft(e);
        });
    }
}
