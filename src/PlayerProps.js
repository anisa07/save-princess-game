
class PlayerProps {
    constructor() {
        this.initPlayerProps()
    }

    initPlayerProps() {
        this.lifes = 3;
        this.score = 0;
        this.isDead = false;
        this.attack = 5;
        this.hp = 100;
    }
    
    set setLifes(lifes) {
        this.lifes = lifes
    }

    set setScore(score) {
        this.score = score;
    }

    set setDead(isDead) {
        this.isDead = isDead;
    }

    set setHp(hp) {
        this.hp = hp;
    }
}

const playerProps = new PlayerProps();
export {playerProps};
