
class PlayerProps {
    constructor() {
        this.initPlayerProps()
    }

    initPlayerProps() {
        this.lives = 3;
        this.score = 0;
        this.attack = 50;
        this.hp = 100;
    }

    playerIsDead() {
        return this.hp < 1;
    }
}

const playerProps = new PlayerProps();
export {playerProps};
