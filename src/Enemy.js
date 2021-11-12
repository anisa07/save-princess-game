import EvilMushroom from "./EvilMushroom";
import {getLevelTiledLayerNames} from "./entityPositionHelper";
import {Goblin} from "./Goblin";

export default class Enemy {
    constructor(game) {
        this.game = game;
        this.enemies = this.game.physics.add.group();
        this.enemies.enableBody = true;
    }

    create(enemyLayers) {
        this.enemiesData = [];

        enemyLayers.forEach(l => {
            switch (l) {
                case 'mushrooms':
                    this.enemiesData.push({
                        enemyType: new EvilMushroom(this.game),
                        enemyPic: 'evilMushroom',
                        enemyObjects: this.game.map.getObjectLayer('mushrooms').objects || []
                    });
                    break;
                case 'goblins':
                    this.enemiesData.push({
                        enemyType: new Goblin(this.game),
                        enemyPic: 'hopHopGoblin',
                        enemyObjects: this.game.map.getObjectLayer('goblins').objects || []
                    })
            }
        });


        enemyLayers.forEach((l, index) => {
            const {enemyObjects, enemyType, enemyPic} = this.enemiesData[index];
            for (const enemy of enemyObjects) {
                this.enemies.create(enemy.x, enemy.y - enemy.height, enemyPic);
            }
            enemyType.create()
        })

        this.game.layout.collide(this.enemies);
    }

        // this.collider = this.game.physics.add.collider(this.game.playerObject.player, this.enemies, this.fight, null, this);

    fight() {}

    // fight() {
        // const enemyIsDead = this.isDead();
        // if (!enemyIsDead) {
        //     playerProps.setDead = true;
        //     // this.scene.playerObject.player.setSize(30, 45)
        //     this.scene.playerObject.player.play('player_get_hit', true);
        //     this.scene.playerObject.player.play('player_death', true);
        //     playerProps.setLifes = playerProps.lifes - 1;
        //     console.log(playerProps.lifes)
        //     updateLifes(-1);
        //     this.scene.playerObject.player.on('animationcomplete', () => {
        //     this.scene.playerObject.player.destroy();
        //     this.scene.registry.destroy();
        //     this.scene.events.off();
        //     this.scene.scene.restart()
        // });
            // enemy.isDead = true;
            // enemy.play('evil_mashroom_die', true);
            // enemy.on('animationcomplete', () => enemy.destroy());
            // if (!enemy.body.touching.none) {
            //     enemy.isDead = true;
            //     console.log(enemy)
            //     enemy.play('evil_mashroom_die', true);
            //     enemy.on('animationcomplete', () => enemy.destroy());
       // }

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
    // }

    // isDead() {
        // const currentPlayerAnim = this.scene.playerObject.player.anims.currentAnim.key;

        // for (const enemy of this.enemies.children.entries) {
        //     if ((!enemy.body.touching.none && currentPlayerAnim === "player_attack") || (enemy.body.touching.up) || enemy.isDead) {
        //         // if (!enemy.isDead) {
        //         //     this.scene.playerObject.player.play('player_jump', true);
        //         //     this.scene.playerObject.player.setVelocityY(-100);
        //         //     playerProps.setScore = playerProps.score + 0.5;
        //         //     updateScore(0.5);
        //         // }
        //         // enemy.isDead = true;
        //         // enemy.play('evil_mashroom_die', true);
        //         // enemy.on('animationcomplete', () => {
        //         //     enemy.destroy();
        //         // });
        //         // return true;
        //     }

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
        // }
    // }

    // playAliveEnemyAnimation(e) {
    //     e.play('evil_mashroom', true);
    // }

    // getLevelLayerNames() {
    //     return this.game.layout.layers.map(l => l.name) || []
    //     // return 'initLayer1'
    // }

    // // TODO real numbers are too bad
    // getRightTileUnderEnemy(x,y, layer) {
    //     return this.game.map.getTileAtWorldXY(x + 50, y + 64, false, null, layer);
    // }
    //
    // getLeftTileUnderEnemy(x,y, layer) {
    //     return this.game.map.getTileAtWorldXY(x - 32, y + 64, false, null, layer);
    // }

    update() {
        const layers = getLevelTiledLayerNames(this.game);
        // const layers = getLevelTiledLayerNames(this.game);

        this.enemiesData.forEach(data => {
            const {enemyType} = data;
            enemyType.update(layers);
        })

        // console.log(this.game.layout.layers)

        // const layers = this.getLevelLayerNames();
        //
        // for (const enemy of this.enemies.children.entries) {
        //     console.log(enemy)
        // }
        //     if (enemy.body.blocked.right) {
        //         enemy.direction = 'LEFT';
        //     }
        //
        //     if (enemy.body.blocked.left) {
        //         enemy.direction = 'RIGHT';
        //     }
        //
        //     for (let layer of layers) {
        //
        //     }



            // for (let layer of layers) {
            //     const tileBottomRight = this.getRightTileUnderEnemy(enemy.x, enemy.y, layer);
            //     const tileBottomLeft = this.getLeftTileUnderEnemy(enemy.x, enemy.y, layer);
            //
            //     if (enemy.direction === 'RIGHT') {
            //         if (tileBottomRight && tileBottomRight.canCollide) {
            //             enemy.setVelocityX(50);
            //             break;
            //         } else {
            //             enemy.direction = 'LEFT'
            //             break;
            //         }
            //     } else {
            //         if (tileBottomLeft && tileBottomLeft.canCollide) {
            //             enemy.setVelocityX(-50);
            //             break;
            //         } else {
            //             enemy.direction = 'RIGHT';
            //             break;
            //         }
            //     }
            // }

        //     const layer = this.levelObstacleLayer();
        //     const tileBottomRight = this.game.map.getTileAtWorldXY(enemy.x + 50, enemy.y + 64, false, null, layer);
        //     const tileBottomLeft = this.game.map.getTileAtWorldXY(enemy.x - 32, enemy.y + 64, false, null, layer);
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

        //     // const tileRight = this.scene.map.getTileAtWorldXY(enemy.x + 50, enemy.y + 64, false, null, 'initLayer1');
        //     // const tileLeft = this.scene.map.getTileAtWorldXY(enemy.x - 32, enemy.y + 64, false, null, 'initLayer1');

            // play run animation
            // !enemy.isDead && this.enemies.playAliveEnemyAnimation(enemy)
        // }
    }
}
