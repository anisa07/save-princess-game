import {getLeftTileUnderEnemy, getRightTileUnderEnemy} from "./entityPositionHelper";
import {playerProps} from './PlayerProps';
import {isDead} from "./enemyHelper";

export default class EvilMushroom {
    constructor(game) {
        this.game = game;
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
                    enemy.direction = 'LEFT';
                }

                if (enemy.body.blocked.left) {
                    enemy.direction = 'RIGHT';
                }

                for (let index = 0; index < layers.length; index++) {
                    const tileBottomRight = getRightTileUnderEnemy(enemy, this.game, layers[index]);
                    const tileBottomLeft = getLeftTileUnderEnemy(enemy, this.game, layers[index]);

                    if (enemy.direction === 'RIGHT' && tileBottomRight && tileBottomRight.canCollide) {
                        enemy.setVelocityX(50);
                        break;
                    } else {
                        enemy.direction = 'LEFT';
                    }

                    if (enemy.direction === 'LEFT' && tileBottomLeft && tileBottomLeft.canCollide) {
                        enemy.setVelocityX(-50);
                        break;
                    } else {
                        enemy.direction = 'RIGHT';
                    }
                }

                !isDead(enemy) && this.playAliveEnemyAnimation(enemy)
            }
        }
    }
}
