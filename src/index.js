import Phaser from 'phaser';
import Enemies from './enemies/Enemies';
import Player from './Player';
import {GameOver} from './GameOver'
import {Background} from './Background'
import {LevelMap} from './LevelMap'
import {Layout} from './Layout'
import {CommonResources} from './CommonResources'
import {playerProps} from './PlayerProps';
import {updateLives, updateHP, updateScore} from './gameInfo';

class InitGame extends Phaser.Scene {
    constructor() {
        super({"key": "InitGame", active: 3});
        // const resources = new CommonResources(this);
        const background = new Background(this, '../src/assets/map/SET1_bakcground_night1.png');
        const layout = new Layout(this,
            {name: 'map0', path: '../src/assets/map/initMap0.json'},
            [
                { name: 'items', layer: 'initLayer1', path: '../src/assets/map/items.png' },
                { name: 'hyptosis_til-art-batch-2', layer: 'initLayer2', path: '../src/assets/map/hyptosis_til-art-batch-2.png' }
            ]);
        this.enemies = new Enemies(this, [
            'mushrooms',
            'goblins',
            'owls',
            'skeletons']);
        this.playerObject = new Player(this);
        this.allResources = [ background, layout, this.enemies, this.playerObject ]; //, tileset,, enemies, player];
        this.levelMap = new LevelMap(this.allResources);
    }

    preload() {
        this.levelMap.load();
    }

    create() {
        this.levelMap.create();

        playerProps.hp = 100;
        updateHP(playerProps.hp);
    }

    collide(actors) {
        this.layers.forEach((l) => {
            if (l.layer && l.layer.layer) {
                this.physics.add.collider(actors, l.layer);
            }
        });
    }

    update() {
        this.playerObject.update();

        updateHP(playerProps.hp);
        updateLives(playerProps.lives);
        updateScore(playerProps.score);

        !playerProps.playerIsDead() && this.enemies.update();

        if (this.playerObject.player.y > 800) {
            playerProps.lives -= 1;
            // todo refactor
            this.scene.restart()
        }
    }
}

const initGame = new InitGame();
const gameOver = new GameOver();

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: [initGame, gameOver],
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: {y: 200}
        }
    },
    pixelArt: true,
    scale: {
        mode: Phaser.Scale.ScaleModes.NONE,
        width: window.innerWidth,
        height: window.innerHeight,
    },
    canvasStyle: `display: block; width: 100%; height: 100%;`,
    autoFocus: true,
    callbacks: {
        postBoot: () => {
            window.sizeChanged();
        },
    },
};

window.sizeChanged = () => {
    if (window.game && window.game.isBooted) {
        setTimeout(() => {
            window.game.scale.resize(window.innerWidth, window.innerHeight);

            window.game.canvas.setAttribute(
                'style',
                `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`,
            );
        }, 100);
    }
};

window.onresize = () => window.sizeChanged();
window.game = new Phaser.Game(config);

