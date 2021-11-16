import EvilMushroom from "./EvilMushroom";
import {getLevelTiledLayerNames} from "./entityPositionHelper";
import Goblin from "./Goblin";
import {playerProps} from "./PlayerProps";
import {isDead} from "./enemyHelper";

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

        this.game.collide(this.enemies);

        this.game.physics.add.collider(this.game.playerObject.player, this.enemies, this.fight, null, this);
    }

    findEnemy(type) {
        const enemyObject = this.enemiesData.find((e) => e.enemyPic === type)
        if (enemyObject) {
            return enemyObject.enemyType;
        }
    }

    fight(player, enemy) {
        if (!isDead(enemy) && !playerProps.playerIsDead()) {
            const e = this.findEnemy(enemy.name);
            e.fight(player, enemy)
        }
    }

    update() {
        const layers = getLevelTiledLayerNames(this.game);

        this.enemiesData.forEach(data => {
            const {enemyType} = data;
            enemyType.update(layers);
        })
    }
}
