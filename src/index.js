import Phaser from 'phaser';
import Enemy from './Enemy';
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

        this.resources = new CommonResources(this);
        this.background = new Background(this, '../src/assets/SET1_bakcground_night1.png');
    }

    preload() {
        this.layout = new Layout(this,
            {name: 'map0', path: '../src/assets/initMap0.json'},
            [
                {name: 'items', layer: 'initLayer1', path: '../src/assets/items.png'},
                {
                    name: 'hyptosis_til-art-batch-2',
                    layer: 'initLayer2',
                    path: '../src/assets/hyptosis_til-art-batch-2.png'
                }
            ]);
        const allResources = [this.resources, this.background, this.layout]; //, tileset,, enemies, player];
        this.levelMap = new LevelMap(allResources);
        this.levelMap.load();
    }

    create() {
        this.levelMap.create();

        playerProps.hp = 100;
        updateHP(playerProps.hp);
        this.playerObject = new Player(this);
        this.playerObject.create(30, 450);

        this.enemy = new Enemy(this);
        this.enemy.create(['mushrooms'])
    }

    update() {
        this.playerObject.update();

        updateHP(playerProps.hp);
        updateLives(playerProps.lives);
        updateScore(playerProps.score);

        !playerProps.playerIsDead() && this.enemy.update();

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

