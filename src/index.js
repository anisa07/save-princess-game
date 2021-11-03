import Phaser from 'phaser';
import EvilMashroom from './EvilMashroom';
import Player from './Player';
import GameObjects from './GameObjects';
import { GameOver } from './GameOver'
import {playerProps} from './PlayerProps';

// export const globalGameObjects = {
//     player: {},

// }

class InitGame extends Phaser.Scene {
    constructor ()
    {
        super({ "key": "InitGame", active: 3 });

        this.backgroundLayer1 = {}
        this.backgroundLayer2 = {}
        this.gameObjects = new GameObjects(this)
        // this.enemies = {}
        // this.player = {}
    }

    initialize() {
      //Phaser.Scene.call(this, { "key": "InitGame" });
    }

    preload () {
        // this.load.image('diamond1', '../src/assets/diamond_big_01.png');
        // this.load.image('diamond2', '../src/assets/diamond_big_02.png');
        // this.load.image('diamond3', '../src/assets/diamond_big_03.png');
        // this.load.image('diamond4', '../src/assets/diamond_big_04.png');
        // this.load.image('diamond5', '../src/assets/diamond_big_05.png');
        // this.load.image('diamond6', '../src/assets/diamond_big_06.png');

        // this.load.spritesheet("eyeMonster", "../src/assets/eye_monster_idle7.png", { frameWidth: 150, frameHeight: 128} );
        // this.load.spritesheet('evilMashroom', "../src/assets/evil_mashroom.png", { frameWidth: 60, frameHeight: 65})
        // this.load.spritesheet('evilMashroomDie', "../src/assets/evil_mashroom_die.png", { frameWidth: 50, frameHeight: 50})
        
        this.load.image('pic1', '../src/assets/SET1_bakcground_night1.png');
        this.load.image('tiles1', '../src/assets/items.png');
        this.load.image('tiles2', '../src/assets/hyptosis_til-art-batch-2.png');
        this.load.tilemapTiledJSON('map0', '../src/assets/initMap0.json');
        this.gameObjects.preload();
    }
      
    create ()
    {
        // this.map = this.add.tilemap('map0');
        this.map = this.make.tilemap({key: 'map0'});
        const tileset1 = this.map.addTilesetImage('items', 'tiles1');
        const tileset2 = this.map.addTilesetImage('hyptosis_til-art-batch-2', 'tiles2');
        
        // let pic1 = this.add.image(0, 0, "pic1");
        let image = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, 'pic1');
        let scaleX = this.cameras.main.width / image.width;
        let scaleY = this.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);

        this.backgroundLayer1 = this.map.createLayer('initLayer1', tileset1, 0, 0);
        this.backgroundLayer2 = this.map.createLayer('initLayer2', tileset2, 0, 0);
      
        //this.backgroundLayer.setCollisionBetween(0, 300);
        // this.backgroundLayer1.setCollisionBetween(0, 300);
        this.map.setCollisionByProperty({collides: true}, true, true, 'initLayer1');
        this.map.setCollisionByProperty({collides: true}, true, true, 'initLayer2');

        // this.backgroundLayer2.setCollisionByProperty({type: ['obstacle']});
        // console.log(this)
        // console.log(this.map)
        this.physics.world.setBounds( 0, 0, this.map.widthInPixels, this.map.heightInPixels);

        this.gameObjects.create();

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

const level0 = new InitGame();
const gameOver = new GameOver();

const config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: [level0, gameOver],
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
