import {getLeftTileUnderEnemy, getRightTileUnderEnemy} from "./entityPositionHelper";
import {playerProps} from './PlayerProps';

export default class EvilMushroom {
    constructor(game) {
        this.game = game;
    }

    create() {
        for (const enemy of this.game.enemy.enemies.children.entries) {
            if (enemy.texture.key === 'evilMushroom') {
                enemy.setPushable(false);
                enemy.direction = 'LEFT';
                enemy.hit = false;
                enemy.attack = 25;
                enemy.hp = 100;
                enemy.setBounce(.1);
                enemy.setOrigin(0);
                // enemy.setOffset(0.1, 0.1);
                enemy.setSize(32, 50);
                enemy.setCollideWorldBounds(true);
                enemy.name = 'evilMushroom'
            }
        }

        this.game.physics.add.collider(this.game.playerObject.player, this.game.enemy.enemies, this.fight, null, this);
    }

    fight(player, enemy) {
        if (!this.isDead(enemy) && !playerProps.playerIsDead()) {
            const currentPlayerAnim = player.anims.currentAnim.key;
            const mushroomBodyTouch = enemy.body.touching;

            if(currentPlayerAnim === "player_attack" && (player.direction === 'RIGHT' && mushroomBodyTouch.left
                || player.direction === 'LEFT' && mushroomBodyTouch.right)) {
                console.log("player hits");
                enemy.hp -= playerProps.attack;
            } else if (mushroomBodyTouch.up) {
                console.log("player kills");
                this.game.playerObject.lethalJump();
                enemy.hp = 0;
            } else {
                console.log("mushroom kicks");
                this.game.playerObject.playerGetsHit(enemy.attack)
            }

            if (this.isDead(enemy)){
                this.enemyDies(enemy)
            }
        }
    }

    gameOver() {
    // // super()
    //     const enemyIsDead = this.isDead();
    //     if (!enemyIsDead) {
    //         playerProps.setDead = true;
    //         // this.scene.playerObject.player.setSize(30, 45)
    //         this.scene.playerObject.player.play('player_get_hit', true);
    //         this.scene.playerObject.player.play('player_death', true);
    //         playerProps.setLifes = playerProps.lifes - 1;
    //         console.log(playerProps.lifes)
    //         updateLifes(-1);
    //         this.scene.playerObject.player.on('animationcomplete', () => {
    //         this.scene.playerObject.player.destroy();
    //         this.scene.registry.destroy();
    //         this.scene.events.off();
    //         this.scene.scene.restart()
    //     });
    //         // enemy.isDead = true;
    //         // enemy.play('evil_mashroom_die', true);
    //         // enemy.on('animationcomplete', () => enemy.destroy());
    //         // if (!enemy.body.touching.none) {
    //         //     enemy.isDead = true;
    //         //     console.log(enemy)
    //         //     enemy.play('evil_mashroom_die', true);
    //         //     enemy.on('animationcomplete', () => enemy.destroy());
    //     }
    //
    //     // if (this.scene.playerObject.player.anims.currentAnim.key === "player_idle" ) {
    //     //     this.isDead();
    //     // }
    //
    //     // this.scene.playerObject.playerProps.isDead = true;
    //     // this.scene.playerObject.player.setSize(30, 45)
    //     // this.scene.playerObject.player.play('player_get_hit', true);
    //     // this.scene.playerObject.player.play('player_death', true);
    //     // this.scene.playerObject.player.on('animationcomplete', () => {
    //     //     this.scene.playerObject.player.destroy();
    //     // });
    //
    //     // // PHEW
    //     // if (this.scene.player.sprite.body.touching.down) {
    //     //     this.die();
    //
    //     //     return;
    //     // }
    //
    //     // // Otherwise, it's game over
    }

    isDead(e) {
        return e.hp < 1;
        // // super()
        // const currentPlayerAnim = this.scene.playerObject.player.anims.currentAnim.key;
        //
        // for (const enemy of this.enemies.children.entries) {
        //     if ((!enemy.body.touching.none && currentPlayerAnim === "player_attack") || (enemy.body.touching.up) || enemy.isDead) {
        //         if (!enemy.isDead) {
        //             this.scene.playerObject.player.play('player_jump', true);
        //             this.scene.playerObject.player.setVelocityY(-100);
        //             playerProps.setScore = playerProps.score + 0.5;
        //             updateScore(0.5);
        //         }
        //         enemy.isDead = true;
        //         enemy.play('evil_mashroom_die', true);
        //         enemy.on('animationcomplete', () => {
        //             enemy.destroy();
        //         });
        //         return true;
        //     }
        //
        //     // console.log(enemy.body.touching)
        //     // enemy.isDead = true;
        //     // enemy.play('evil_mashroom_die', true);
        //     // enemy.on('animationcomplete', () => enemy.destroy());
        //     // if (!enemy.body.touching.none) {
        //     //     enemy.isDead = true;
        //     //     console.log(enemy)
        //     //     enemy.play('evil_mashroom_die', true);
        //     //     enemy.on('animationcomplete', () => enemy.destroy());
        //
        //
        //     //     // increaseScore(.5);
        //
        //     //     // this.scene.player.sprite.setVelocity(0, -350);
        //     //     // this.scene.player.sprite.play('jump');
        //     // };
        // }
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
        for (const enemy of this.game.enemy.enemies.children.entries) {
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

                !this.isDead(enemy) && this.playAliveEnemyAnimation(enemy)
            }
        }
    }
}
