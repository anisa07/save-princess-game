import EvilMushroom from "./EvilMushroom";
import {getLevelTiledLayerNames} from "./entityPositionHelper";
import Goblin from "./Goblin";
import {playerProps} from "./PlayerProps";
import {isDead, getEnemyData} from "./enemyHelper";

export default class Enemies {
    constructor(game) {
        this.game = game;
        this.enemies = this.game.physics.add.group();
        this.enemies.enableBody = true;
    }

    create(enemyLayers) {
        this.enemiesData = enemyLayers.map(l => getEnemyData(l, this.game));

        this.enemiesData.forEach(ed => {
            const {enemyObjects, enemyType, enemyPic} = ed;
            for (const enemy of enemyObjects) {
                this.enemies.create(enemy.x, enemy.y - enemy.height, enemyPic);
            }
            enemyType.create();
        });
        this.game.collide(this.enemies);

        this.game.physics.add.collider(this.game.playerObject.player, this.enemies, this.fight, null, this);
    }

    findEnemy(type) {
        const enemyObject = this.enemiesData.find((e) => e.enemyPic === type);
        if (enemyObject) {
            return enemyObject.enemyType;
        }
    }

    fight(player, enemy) {
        if (isDead(enemy) || playerProps.playerIsDead())
            return;
        const e = this.findEnemy(enemy.name);
        e.fight(player, enemy)
    }

    update() {
        const layers = getLevelTiledLayerNames(this.game);
        this.enemiesData.forEach(data => data.enemyType.update(layers));
    }
}
