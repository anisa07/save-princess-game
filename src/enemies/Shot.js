import {playerProps} from "../PlayerProps";

export class Shot {
    constructor(game, position, attack, direction, params) {
        this.game = game;
        this.shot = this.game.physics.add.sprite(position.x, position.y - 30, name);
        this.shot.name = params.name;
        this.shot.attack = attack;
        this.shot.setBounce(.6);
        this.shot.setOrigin(0);
        this.shot.setOffset(40, 40);
        this.shot.setDisplaySize(32, 32);
        this.shot.exploded = false;
        this.shot.direction = direction;
        this.shot.velocity = params.velocity;
        this.shot.setVelocityX(direction === 'LEFT' ? -params.velocity.x : params.velocity.x);
        this.shot.setVelocityY(params.velocity.y);
        if (params.gravity === false) {
            this.shot.body.allowGravity = false;
        }

        this.game.physics.add.collider(this.game.playerObject.player, this.shot, this.boom, null, this);
    }

    playBombAnimation(e) {
        e.play(this.shot.name, true);
        e.on('animationcomplete', () => {
            this.shot.exploded = true;
            e.destroy();
        });
    }

    update() {
        if (this.shot.exploded) return;
        this.shot.setVelocityX(this.shot.direction === 'LEFT' ? -this.shot.velocity.x : this.shot.velocity.x);
        this.shot.setVelocityY(this.shot.velocity.y);
        this.playBombAnimation(this.shot);
    }

    boom(player, bomb) {
        if (!playerProps.playerIsDead() && bomb.name === this.shot.name) {
            this.shot.destroy();
            this.game.playerObject.playerGetsHit(this.shot.attack);
        }
    }
}
