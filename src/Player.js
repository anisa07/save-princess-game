import {initiateLives} from './gameInfo';
import {playerProps} from './PlayerProps';

class Player {
    constructor(game) {
        this.game = game;
        this.player = null;
    }

    create(x, y, lives) {
        this.cursorKeys = this.game.input.keyboard.createCursorKeys();

        this.player = this.game.physics.add.sprite(x, y, "player_idle");
        this.player.name = 'player';
        this.player.direction = 'RIGHT';
        this.player.setPushable(false);
        this.player.setDepth(1)
        this.player.setCollideWorldBounds(true);
        
        this.game.layout.collide(this.player);

        this.game.cameras.main.setBounds(0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);
        this.game.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.game.cameras.main.setZoom(1.2);

        playerProps.lives = lives;
        initiateLives(lives);
    }

    update() {
        if (this.player && !playerProps.playerIsDead() && this.cursorKeys) {
            this.movePlayerManager();
        }
    }

    movePlayerManager() {
        this.player.setSize(30, 45)

        if (this.cursorKeys.left.isDown && this.cursorKeys.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-120);
            this.player.play("player_jump", true);
            this.player.flipX = true;
            this.player.setVelocityX(-150);
            this.player.direction = 'LEFT';
            return
        } else if (this.cursorKeys.right.isDown && this.cursorKeys.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-120);
            this.player.play("player_jump", true);
            this.player.flipX = false;
            this.player.setVelocityX(150);
            this.player.direction = 'RIGHT';
            return
        } else if (this.cursorKeys.left.isDown && this.cursorKeys.space.isDown) {
            this.player.setSize(65, 45)
            this.player.play("player_attack", true);
            this.player.flipX = true;
            this.player.setVelocityX(-50);
            this.player.direction = 'LEFT';
            return
        } else if (this.cursorKeys.right.isDown && this.cursorKeys.space.isDown) {
            this.player.setSize(65, 45)
            this.player.play("player_attack", true);
            this.player.flipX = false;
            this.player.setVelocityX(50);
            this.player.direction = 'RIGHT';
            return
        } else if (this.cursorKeys.left.isDown) {
            this.player.play("player_run", true);
            this.player.setVelocityX(-150);
            this.player.flipX = true;
            this.player.direction = 'LEFT';
            return
        } else if (this.cursorKeys.right.isDown) {
            this.player.play("player_run", true);
            this.player.setVelocityX(150);
            this.player.flipX = false;
            this.player.direction = 'RIGHT';
            return
        } 
        
        if (this.cursorKeys.up.isDown && this.player.body.onFloor()) {
            this.player.setVelocityY(-200);
            this.player.play("player_jump", true);
            return
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(200);
            this.player.play("player_fall", true);
            return
        } 

        if (this.cursorKeys.space.isDown) {
            this.player.setSize(65, 45)
            this.player.play("player_attack", true);
            return
        }

        if (!playerProps.playerIsDead()) {
            this.player.setVelocityX(0);
            this.player.play("player_idle", true);
        }
    }

    lethalJump() {

    }

    playerGetsHit(enemyAttack) {
        console.log('test')
    }

    playerDies() {

    }
}

export default Player;
