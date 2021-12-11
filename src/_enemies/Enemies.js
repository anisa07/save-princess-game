import {getLevelTiledLayerNames} from "../entityPositionHelper";
import {playerProps} from "../PlayerProps";
import {isDead, getEnemyData} from "./enemyHelper";

export default class Enemies {
    constructor(game, enemyLayers) {
        this.game = game;
        this.enemies = undefined;
        this.enemyLayers = enemyLayers;
        this.enemiesData = this.enemyLayers.map(l => getEnemyData(l, this.game));
    }

    load() {
        this.enemiesData.forEach(ed => ed.enemyType.loadResources());
    }

    create() {
        this.enemiesData.forEach(ed => ed.enemyType.createResources());
        this.enemies = this.game.physics.add.group();
        this.enemies.enableBody = true;
        this.createEnemies();
    }

    createEnemies() {
        this.enemiesData.forEach(ed => {
            const {objLayer, enemyType } = ed;
            const enemyObjects = enemyType.getObjectLayer(objLayer);
            for (const enemy of enemyObjects) {
                this.enemies.create(enemy.x, enemy.y - enemy.height, enemyType.name );
            }
            enemyType.create();
            let index = 1;
            this.enemies.children.entries.forEach(enemy => enemy.index = index++);
        });

        this.game.collide(this.enemies);
    }

    setCollideToPlayer() {
        this.game.physics.add.collider(this.game.playerObject.player, this.enemies, this.fight, null, this);
    }

    findEnemy(type) {
        const enemyObject = this.enemiesData.find((e) => e.enemyType.name === type);
        if (enemyObject) {
            return enemyObject.enemyType;
        }
    }

    getEnemies(name) {
        return this.enemies.children.entries.filter((e) => e.texture.key === name);
    }

    fight(player, enemy) {
        if (isDead(enemy) || playerProps.playerIsDead())
            return;
        const e = this.findEnemy(enemy.name);
        e.fight(player, enemy)
    }

    update() {
        const layers = getLevelTiledLayerNames(this.game);
        if (layers) {
            this.enemiesData.forEach(data => data.enemyType.update(layers));
        }
    }
}
