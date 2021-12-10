import {getRandomArbitrary} from "./entityPositionHelper";
import Bomb from "./Bomb";

class EvilEnergy extends Bomb {
    constructor(game) {
        super(game)
        this.game = game;
    }

    create(x, y, key, name, attack, direction) {
        super.create(x, y, key, name, attack, direction);
        this.bomb.setOffset(0, 0);
    }

    playEnergyAnimation(e) {
        e.play('evil_energy', true);
        e.on('animationcomplete', () => {
            this.bomb.exploded = true;
            e.destroy();
        });
    }

    update() {
        if (!this.bomb.exploded) {
            const speed = getRandomArbitrary(50, 150);
            this.bomb.setVelocityY(speed);
            this.playEnergyAnimation(this.bomb);
        }
    }

    boom(player, bomb) {
        super.boom(player, bomb)
        // if (!playerProps.playerIsDead() && bomb.name === this.bomb.name) {
        //     this.bomb.destroy();
        //     this.game.playerObject.playerGetsHit(this.bomb.attack);
        // }
    }
}

export default EvilEnergy;
