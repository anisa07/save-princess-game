import {updateLifes,updateScore} from './gameInfo';
import {playerProps} from './PlayerProps';
import Enemy from './Enemy';

class EvilMashroom extends Enemy {
    constructor(game) {
        super(game);
        // this.scene = scene;
        // this.enemies = this.scene.physics.add.group();
        // this.enemies.enableBody = true;
        // this.collider = this.scene.physics.add.collider(this.scene.playerObject.player, this.enemies, this.fight, null, this);

        const enemiesObjects = this.game.map.getObjectLayer('mashrooms').objects;

        for (const enemy of enemiesObjects) {
            this.enemies.create(enemy.x, enemy.y - enemy.height, 'evilMashroom')
                .setScale(1)
                // .setOrigin(1)
                // .setBounce(0.1)
                // .setDepth(-1)
                // .setCollideWorldBounds(true);

            // console.log(enemy)    
            // const tileRight = this.scene.map.getTileAtWorldXY(enemy.x, enemy.y, true, null, this.scene.backgroundLayer1);
            // const tileRight2 = this.scene.map.getTileAt(enemy.x, enemy.y, true, null, this.scene.backgroundLayer1);
            // console.log(tileRight)
            // console.log(tileRight2)
            // console.log(enemy)
            // if(tileRight) {
            //     tileRight.alpha = 0.1
            // }
            // if (tileRight2) {}

        }

        for (const enemy of this.enemies.children.entries) {
            enemy.setPushable(false);
            enemy.direction = 'LEFT';
            enemy.isDead = false;
            enemy.attack = 25;
            // enemy.setDepth(-1)
            // enemy.setBounce(.7);
            enemy.setOrigin(0)
            //enemy.setSizeToFrame(32, 32)
            // enemy.setOffset(0, -10);
            enemy.setSize(30, 40)
        }
        this.game.layout.collide(this.enemies);
    }

    create() {
        super.create()
    }

    gameOver() {
    // super()
        const enemyIsDead = this.isDead();
        if (!enemyIsDead) {
            playerProps.setDead = true; 
            // this.scene.playerObject.player.setSize(30, 45)
            this.scene.playerObject.player.play('player_get_hit', true);
            this.scene.playerObject.player.play('player_death', true);
            playerProps.setLifes = playerProps.lifes - 1;
            console.log(playerProps.lifes)
            updateLifes(-1);
            this.scene.playerObject.player.on('animationcomplete', () => {
            this.scene.playerObject.player.destroy();
            this.scene.registry.destroy();
            this.scene.events.off();
            this.scene.scene.restart()
        });
            // enemy.isDead = true;
            // enemy.play('evil_mashroom_die', true);
            // enemy.on('animationcomplete', () => enemy.destroy());
            // if (!enemy.body.touching.none) {
            //     enemy.isDead = true;
            //     console.log(enemy)
            //     enemy.play('evil_mashroom_die', true);
            //     enemy.on('animationcomplete', () => enemy.destroy());
        }
        
        // if (this.scene.playerObject.player.anims.currentAnim.key === "player_idle" ) {
        //     this.isDead();
        // }

        // this.scene.playerObject.playerProps.isDead = true;
        // this.scene.playerObject.player.setSize(30, 45)
        // this.scene.playerObject.player.play('player_get_hit', true);
        // this.scene.playerObject.player.play('player_death', true);
        // this.scene.playerObject.player.on('animationcomplete', () => {
        //     this.scene.playerObject.player.destroy();
        // });

        // // PHEW
        // if (this.scene.player.sprite.body.touching.down) {
        //     this.die();
    
        //     return;
        // }
    
        // // Otherwise, it's game over
    }

    isDead() {
        // super()
        const currentPlayerAnim = this.scene.playerObject.player.anims.currentAnim.key;

        for (const enemy of this.enemies.children.entries) {
            if ((!enemy.body.touching.none && currentPlayerAnim === "player_attack") || (enemy.body.touching.up) || enemy.isDead) {
                if (!enemy.isDead) {
                    this.scene.playerObject.player.play('player_jump', true);
                    this.scene.playerObject.player.setVelocityY(-100);
                    playerProps.setScore = playerProps.score + 0.5; 
                    updateScore(0.5);
                }
                enemy.isDead = true;
                enemy.play('evil_mashroom_die', true);
                enemy.on('animationcomplete', () => {
                    enemy.destroy();
                });
                return true;
            }
            
            // console.log(enemy.body.touching)
            // enemy.isDead = true;
            // enemy.play('evil_mashroom_die', true);
            // enemy.on('animationcomplete', () => enemy.destroy());
            // if (!enemy.body.touching.none) {
            //     enemy.isDead = true;
            //     console.log(enemy)
            //     enemy.play('evil_mashroom_die', true);
            //     enemy.on('animationcomplete', () => enemy.destroy());
            
    
            //     // increaseScore(.5);
    
            //     // this.scene.player.sprite.setVelocity(0, -350);
            //     // this.scene.player.sprite.play('jump');
            // };
        }
    }

    playAliveEnemyAnimation(e) {
        e.play('evil_mashroom', true);
    }

    levelObstacleLayer() {
        return 'initLayer1'
    }
    
    
    update() {
        super.update()
        // for (const enemy of this.enemies.children.entries) {
        //     if (enemy.body.blocked.right) {
        //         enemy.direction = 'LEFT';
        //     }
    
        //     if (enemy.body.blocked.left) {
        //         enemy.direction = 'RIGHT';
        //     }

        //     const tileRight = this.scene.map.getTileAtWorldXY(enemy.x + 50, enemy.y + 64, false, null, 'backgroundLayer1');
        //     const tileLeft = this.scene.map.getTileAtWorldXY(enemy.x - 32, enemy.y + 64, false, null, 'backgroundLayer1');
    
        //     if (enemy.direction === 'RIGHT') {
        //         if (tileRight && tileRight.canCollide) {
        //             enemy.setVelocityX(50);
        //         } else {
        //             enemy.direction = 'LEFT'
        //         }
        //     } else {
        //         if (tileLeft && tileLeft.canCollide) {
        //             enemy.setVelocityX(-50);
        //         } else {
        //             enemy.direction = 'RIGHT'
        //         }
        //     }
    
        //     // play run animation
        //     !enemy.isDead && enemy.play('evil_mashroom', true);
        // }
    }
}

export default EvilMashroom;