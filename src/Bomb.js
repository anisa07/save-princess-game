import {getRandomArbitrary} from "./entityPositionHelper";

class Bomb {
    constructor(game) {
        this.game = game;
    }

    create(x, y, key, name, attack, direction) {
        this.bomb = this.game.physics.add.sprite(x, y, key);
        this.bomb.name = name;
        this.bomb.attack = attack;
        this.bomb.setBounce(.6);
        this.bomb.setOrigin(0);
        // this.bomb.setSize(32, 32);
        this.bomb.exploded = false;
        this.bomb.direction = direction;

        this.game.physics.add.collider(this.game.playerObject.player, this.bomb, this.boom, null, this);
    }

    playBombAnimation(e) {
        e.play('big_bomb', true);
        e.on('animationcomplete', () => {
            this.bomb.exploded = true;
            e.destroy();
        });
    }

    update() {
        if (!this.bomb.exploded) {
            const speed = getRandomArbitrary(50, 150);
            if (this.bomb.direction === "LEFT") {
                this.bomb.setVelocityX(-speed);
            } else {
                this.bomb.setVelocityX(speed);
            }
            this.playBombAnimation(this.bomb);
        }
    }

    boom() {
        console.log('bomb hit player')
    }
}

export default Bomb;
