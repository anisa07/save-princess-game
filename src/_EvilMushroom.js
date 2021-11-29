import {isOnTheGround, noGroundOnLeft, noGroundOnRight} from "./entityPositionHelper";
import {playerProps} from './PlayerProps';
import {isDead} from "./enemyHelper";
import Enemy from "./Enemy";

export default class EvilMushroom extends Enemy {
    constructor(game) {
        super(game, 'evilMushroom','evil_mashroom_die');
    }

    create() {
        for (const enemy of this.game.enemies.enemies.children.entries) {
            if (enemy.texture.key === 'evilMushroom') {
                enemy.setPushable(false);
                enemy.direction = 'LEFT';
                enemy.attack = 25;
                enemy.hp = 100;
                enemy.setBounce(.1);
                enemy.setOrigin(0);
                enemy.setSize(32, 50);
                enemy.setCollideWorldBounds(true);
                enemy.name = 'evilMushroom'
            }
        }
    }

    fight(player, enemy) {
        const currentPlayerAnim = player.anims.currentAnim.key;
        const mushroomBodyTouch = enemy.body.touching;

        if(currentPlayerAnim === "player_attack" && (player.direction === 'RIGHT' && mushroomBodyTouch.left
            || player.direction === 'LEFT' && mushroomBodyTouch.right)) {
            enemy.hp -= playerProps.attack;
        } else if (mushroomBodyTouch.up) {
            this.game.playerObject.lethalJump();
            enemy.hp = 0;
        } else {
            this.game.playerObject.playerGetsHit(enemy.attack)
        }

        if (isDead(enemy)){
            this.enemyDies(enemy)
        }
    }

    playAliveEnemyAnimation(e) {
        e.play('evil_mashroom', true);
    }

    enemyDies(e) {
        e.play('evil_mashroom_die', true);
        e.on('animationcomplete', () => {
            e.destroy();
        });
    }

    update(layers) {
        for (const enemy of this.game.enemies.enemies.children.entries) {
            if (enemy.name === 'evilMushroom') {
                if (enemy.body.blocked.right) {
                    this.moveLeft(enemy);
                }

                if (enemy.body.blocked.left) {
                    this.moveRight(enemy);
                }

                for (let index = 0; index < layers.length; index++) {
                    if (isOnTheGround(enemy, this.game, layers[index])) {
                        if (enemy.direction === 'RIGHT' && noGroundOnRight(enemy, this.game, layers[index])) {
                            this.moveLeft(enemy);
                            continue;
                        }

                        if (enemy.direction === 'LEFT' && noGroundOnLeft(enemy, this.game, layers[index])) {
                            this.moveRight(enemy)
                            continue;
                        }

                        if (!enemy.velocity) {
                            enemy.setVelocityX(enemy.direction === 'LEFT' ? -50 : 50);
                        }
                    }
                }

                !isDead(enemy) && this.playAliveEnemyAnimation(enemy)
            }
        }
    }

    moveLeft(enemy) {
        enemy.direction = 'LEFT';
        enemy.setVelocityX(-50);
        enemy.flipX = true;
    }

    moveRight(enemy) {
        enemy.direction = 'RIGHT';
        enemy.setVelocityX(50);
        enemy.flipX = false;
    }
}
