import {playerProps} from './PlayerProps';

let hitTimer;
class Player {
    constructor(game) {
        this.game = game;
        this.player = null;
    }

    create(x, y) {
        this.cursorKeys = this.game.input.keyboard.createCursorKeys();

        this.player = this.game.physics.add.sprite(x, y, "player_idle");
        this.player.name = 'player';
        this.player.looseLife = false;
        this.player.direction = 'RIGHT';
        this.player.setPushable(false);
        this.player.setDepth(1)
        this.player.setCollideWorldBounds(true);
        
        this.game.collide(this.player);

        this.game.cameras.main.setBounds(0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);
        this.game.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        this.game.cameras.main.setZoom(1.2);
    }

    update() {
        if (this.player && !playerProps.playerIsDead() && this.cursorKeys) {
            this.movePlayerManager();
        }

        if (playerProps.lives <= 0) {
            this.game.scene.start("GameOver");
        }

        if (playerProps.playerIsDead() && !this.player.looseLife) {
            this.playerDies();
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
        this.player.play('player_jump', true);
        this.player.setVelocityY(-100);
        playerProps.score += 0.5;
    }

    playerGetsHit(enemyAttack) {
        this.player.alpha = 0.5;
        hitTimer = setTimeout(() => {
            this.player.alpha = 1;
            clearTimeout(hitTimer);
        }, 500)
        this.player.play('player_get_hit', true);
        playerProps.hp -= enemyAttack;
    }

    playerDies() {
        this.player.play('player_death', true);
        this.player.looseLife = true;
        this.player.on('animationcomplete', () => {
            playerProps.lives -= 1;
            this.game.scene.restart();
        });
    }
}

export default Player;
