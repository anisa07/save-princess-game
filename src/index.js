import Phaser from 'phaser';
import EvilMashroom from './EvilMashroom';
import Player from './Player';
import { GameOver } from './GameOver'
import { Background } from './Background'
import { LevelMap } from './LevelMap'
import { Layout } from './Layout'
import { CommonResources } from './CommonResources'
import {playerProps} from './PlayerProps';

// export const globalGameObjects = {
//     player: {},

// }

class InitGame extends Phaser.Scene {
    constructor ()
    {
        super({ "key": "InitGame", active: 3 });
        const resources = new CommonResources(this);
        const background = new Background(this, '../src/assets/SET1_bakcground_night1.png');
        this.layout = new Layout(this, 
          {name: 'map0', path: '../src/assets/initMap0.json'}, 
          [
            {name: 'items', layer: 'initLayer1', path: '../src/assets/items.png'},
            {name: 'hyptosis_til-art-batch-2', layer: 'initLayer2', path: '../src/assets/hyptosis_til-art-batch-2.png'}
        ]);
        const allResources = [ resources, background, this.layout ]; //, tileset,, enemies, player];
        this.levelMap = new LevelMap(allResources);
        // this.enemies = {}
        // this.player = {}
    }

    initialize() {
      //Phaser.Scene.call(this, { "key": "InitGame" });
    }

    preload () {
        this.levelMap.load();
    }
      
    create () {
        this.levelMap.create();

        // this.backgroundLayer2.setCollisionByProperty({type: ['obstacle']});
        // console.log(this)
        // console.log(this.map)

        this.playerObject = new Player(this);
        this.playerObject.create(30, 450);

        this.enemies = new EvilMashroom(this);

        // console.log(this.player)

        // console.log(this.map.getTileAtWorldXY(10, 32*16+16, false, null, 'backgroundLayer1'))
        

        // this.game.scale.resize(this.map.widthInPixels, this.map.heightInPixels);
        // this.scale.setGameSize(this.map.widthInPixels, this.map.heightInPixels).getParentBounds();
        // this.scene.setGameSize(this.map.widthInPixels, this.map.heightInPixels)
        // this.anims.create({
        //     key: 'diamond',
        //     frames: [
        //         { key: 'diamond1' },
        //         { key: 'diamond2' },
        //         { key: 'diamond3' },
        //         { key: 'diamond4' },
        //         { key: 'diamond5' },
        //         { key: 'diamond6' }
        //     ],
        //     frameRate: 10,
        //     repeat: -1
        // });
    
        // this.add.sprite(32, 32, 'diamond1').play('diamond');

        // this.add.sprite(128, 128, 'heart1').play('heart');


        // this.eyeMonster = this.physics.add.sprite(100, 70, "eyeMonster")

        // this.anims.create({
        //     key: "eye_Monster",
        //     frames: this.anims.generateFrameNumbers("eyeMonster"),
        //     frameRate: 8,
        //     repeat: -1
        // })

        // this.eyeMonster.setScale(0.08, 0.08)
        // this.eyeMonster.play("eye_Monster")
        // this.eyeMonster.setCollideWorldBounds(true);
        // this.eyeMonster.body.setAllowGravity(false);

        // this.eyeMonster.setInteractive();
        // console.log(this.map)

        // this.cursorKeys = this.input.keyboard.createCursorKeys()

        // this.eyeMonster.setBounce(0);
        
        // this.eyeMonster.setCollideWorldBounds(true);

        // this.setPlayer(30, 32)

        // this.enemies = new Enemy(this) 

      //   this.time.addEvent({
      //     delay: 3000,
      //     loop: false,
      //     callback: () => {
      //         this.scene.start("GameOver");
      //     }
      // });

      // this.scene.start("GameOver");
    }

    update() {
      this.playerObject.update();
      // console.log(this.map.getTileAtWorldXY(this.player.player.x, this.player.player.y+32, false, null, 'backgroundLayer1'))

        //  this.movePlayerManager();\
        
        !playerProps.isDead && this.enemies.update();

        if (this.playerObject.player.y > 800) {
          playerProps.isDead = true;
          // todo refactor
          this.scene.restart()
        }

        if (playerProps.lifes <= 0) {
          this.scene.start("GameOver");
        }
    }

    // movePlayerManager() {
    //     if (this.cursorKeys.left.isDown) {
    //         this.eyeMonster.setVelocityX(-100);
    //         if (this.eyeMonster.flipX) {
    //             this.eyeMonster.flipX = false;
    //         }
    //     } else if (this.cursorKeys.right.isDown) {
    //         this.eyeMonster.setVelocityX(100);
    //         this.eyeMonster.flipX = true;
    //     } else {
    //         // If no keys are pressed, the player keeps still
    //         this.eyeMonster.setVelocityX(0);
    //         // Only show the idle animation if the player is footed
    //         // If this is not included, the player would look idle while jumping
    //         // if (this.player.body.onFloor()) {
    //         //   this.player.play('idle', true);
    //         // }
    //     }
          

    //     if (this.cursorKeys.up.isDown) {
    //         this.eyeMonster.setVelocityY(-100);
    //     } else if (this.cursorKeys.down.isDown) {
    //         this.eyeMonster.setVelocityY(100);
    //     } else {
    //         // If no keys are pressed, the player keeps still
    //         this.eyeMonster.setVelocityY(0);
    //         // Only show the idle animation if the player is footed
    //         // If this is not included, the player would look idle while jumping
    //         // if (this.player.body.onFloor()) {
    //         //   this.player.play('idle', true);
    //         // }
    //     }
    // }
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
            gravity: { y: 200 }
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
// window.myGame = newGame;
