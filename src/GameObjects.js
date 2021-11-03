import generateAnimations from './animations'

class GameObjects {
    constructor (game) {

        this.game = game;
        // this.player = null
        // this.playerProps = {
        //     attack: 5,
        //     health: 100,
        //     lifes: 3,
        //     diamonds: 0,
        //     isDead: false
        // }
        // this.backgroundLayer = {}
    }

    preload () {
        this.game.load.image('diamond1', '../src/assets/diamond_big_01.png');
        this.game.load.image('diamond2', '../src/assets/diamond_big_02.png');
        this.game.load.image('diamond3', '../src/assets/diamond_big_03.png');
        this.game.load.image('diamond4', '../src/assets/diamond_big_04.png');
        this.game.load.image('diamond5', '../src/assets/diamond_big_05.png');
        this.game.load.image('diamond6', '../src/assets/diamond_big_06.png');

        this.game.load.image('heart1', '../src/assets/heart01.png');
        this.game.load.image('heart2', '../src/assets/heart02.png');
        this.game.load.image('heart3', '../src/assets/heart03.png');
        this.game.load.image('heart4', '../src/assets/heart04.png');
        this.game.load.image('heart5', '../src/assets/heart05.png');
        this.game.load.image('heart6', '../src/assets/heart06.png');

        this.game.load.spritesheet('playerIdle', "../src/assets/PlayerIdle.png", { frameWidth: 45, frameHeight: 45})
        this.game.load.spritesheet('playerRun', "../src/assets/PlayerRun.png", { frameWidth: 45, frameHeight: 45})
        this.game.load.spritesheet('playerJump', "../src/assets/PlayerJump.png", { frameWidth: 45, frameHeight: 45})
        this.game.load.spritesheet('playerFall', "../src/assets/PlayerFall.png", { frameWidth: 45, frameHeight: 45})
        this.game.load.spritesheet('playerAttack', "../src/assets/PlayerAttack1.png", { frameWidth: 120, frameHeight: 65})
        this.game.load.spritesheet('playerDeath', "../src/assets/PlayerDeath.png", { frameWidth: 45, frameHeight: 45})
        this.game.load.spritesheet('playerGetHit', "../src/assets/PlayerGetHit.png", { frameWidth: 45, frameHeight: 45})

        this.game.load.spritesheet('evilMashroom', "../src/assets/evil_mashroom.png", { frameWidth: 60, frameHeight: 65})
        this.game.load.spritesheet('evilMashroomDie', "../src/assets/evil_mashroom_die.png", { frameWidth: 50, frameHeight: 50})


        // this.load.spritesheet("eyeMonster", "../src/assets/eye_monster_idle7.png", { frameWidth: 150, frameHeight: 128} );
        // this.load.image('tiles', '../src/assets/SET1_Mainlev_build.png');
        // this.load.tilemapTiledJSON('map0', '../src/assets/knightMap04.json')
    }
      
    create () {
        generateAnimations(this.game)
        // this.map = this.add.tilemap('map0');
        // this.map = this.make.tilemap({key: 'map0', tileHeight: 64, tileWidth: 64});
        // const tileset = this.map.addTilesetImage('level0', 'tiles');
        // this.backgroundLayer = this.map.createLayer('blockedLayer', tileset, 0, 0);
        // this.backgroundLayer.setCollisionBetween(0, 300);

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
        //     frameRate: 8,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'heart',
        //     frames: [
        //         { key: 'heart1' },
        //         { key: 'heart2' },
        //         { key: 'heart3' },
        //         { key: 'heart4' },
        //         { key: 'heart5' },
        //         { key: 'heart6' }
        //     ],
        //     frameRate: 8,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: "player_idle",
        //     frames: this.anims.generateFrameNumbers("playerIdle"),
        //     frameRate: 10,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "player_run",
        //     frames: this.anims.generateFrameNumbers("playerRun"),
        //     frameRate: 6,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "player_jump",
        //     frames: this.anims.generateFrameNumbers("playerJump"),
        //     frameRate: 4,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "player_fall",
        //     frames: this.anims.generateFrameNumbers("playerFall"),
        //     frameRate: 4,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "player_attack",
        //     frames: this.anims.generateFrameNumbers("playerAttack"),
        //     frameRate: 6,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "player_death",
        //     frames: this.anims.generateFrameNumbers("playerDeath"),
        //     frameRate: 9,
        //     repeat: -1
        // })

        // this.anims.create({
        //     key: "player_get_hit",
        //     frames: this.anims.generateFrameNumbers("playerGetHit"),
        //     frameRate: 3,
        //     repeat: -1
        // })

        // this.cursorKeys = this.input.keyboard.createCursorKeys()
    
        // this.add.sprite(32, 32, 'diamond1').play('diamond');

        // this.player = this.physics.add.sprite(70, 100, "player_idle")
        // this.player.setSizeToFrame(32, 32)
        // // this.player.setScale(1, 1)
        // // this.player.play("player_idle")
        // // this.player.play("player_run")
        // this.player.setBounce(0.1);
        // this.player.setCollideWorldBounds(true);
        
        // // this.player.body.setAllowGravity(false);

        // // this.eyeMonster.setInteractive();
        // // console.log(this.map)

        // // this.player.setBounce(0);
        // this.player.body.setOffset(10, 10)

        // this.cameras.main.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);
        // this.cameras.main.startFollow(this.eyeMonster);

        // this.physics.add.collider(this.eyeMonster, this.backgroundLayer);
    }

    update() {
        // if (this.player) {
        //     this.movePlayerManager();
        // }
    }

    // setPlayer(x, y) {
    //     this.player = this.physics.add.sprite(x, y, "player_idle")
    //     this.player.setSizeToFrame(32, 32)
    //     this.player.setBounce(0.1);
    //     this.player.setCollideWorldBounds(true);
    //     this.player.body.setOffset(10, 10)
    // }

    // movePlayerManager() {
    //     if (this.cursorKeys.left.isDown && this.cursorKeys.up.isDown && this.player.body.onFloor()) {
    //         this.player.setVelocityY(-100);
    //         this.player.play("player_jump", true);
    //         this.player.flipX = true;
    //         this.player.setVelocityX(-150);
    //         return
    //     } else if (this.cursorKeys.right.isDown && this.cursorKeys.up.isDown && this.player.body.onFloor()) {
    //         this.player.setVelocityY(-100);
    //         this.player.play("player_jump", true);
    //         this.player.flipX = false;
    //         this.player.setVelocityX(150);
    //         return
    //     } else if (this.cursorKeys.left.isDown) {
    //         this.player.play("player_run", true);
    //         this.player.setVelocityX(-100);
    //         this.player.flipX = true;
    //         return
    //     } else if (this.cursorKeys.right.isDown) {
    //         this.player.play("player_run", true);
    //         this.player.setVelocityX(100);
    //         this.player.flipX = false;
    //         return
    //     } 
        
    //     // else {
    //     //     // If no keys are pressed, the player keeps still
    //     //     this.player.setVelocityX(0);
    //     //     // this.player.play("player_idle", true);
    //     //     // Only show the idle animation if the player is footed
    //     //     // If this is not included, the player would look idle while jumping
    //     //     // if (this.player.body.onFloor()) {
    //     //     //   this.player.play('idle', true);
    //     //     // }
    //     // }
        
    //     if (this.cursorKeys.up.isDown && this.player.body.onFloor()) {
    //         this.player.setVelocityY(-200);
    //         this.player.play("player_jump", true);
    //         return
    //     } else if (this.cursorKeys.down.isDown) {
    //         this.player.setVelocityY(100);
    //         this.player.play("player_fall", true);
    //         return
    //     } 
        
    //     // else {
    //     //     // If no keys are pressed, the player keeps still
    //     //     // this.player.setVelocityY(0);
    //     //     // this.player.play("player_idle", true)
    //     //     // Only show the idle animation if the player is footed
    //     //     // If this is not included, the player would look idle while jumping
    //     //     // if (this.player.body.onFloor()) {
    //     //     //   this.player.play('idle', true);
    //     //     // }
    //     // }

    //     if (this.cursorKeys.space.isDown) {
    //         this.player.play("player_attack", true);
    //         this.player.setVelocityX(10);
    //         this.player.body.setOffset(10, 20)
    //         return
    //     }

    //     if (this.player) {
    //         this.player.body.setOffset(10, 10)
    //         this.player.setVelocityX(0);
    //     }
    // }
}

export default GameObjects;