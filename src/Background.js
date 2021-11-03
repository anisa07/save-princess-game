export class Background {
    constructor(game, name) {
        this.game = game;
        this.name = name;
        this.bgName = 'background';
    }
    load() {
        this.game.load.image(this.bgName, this.name);
    }
    create() {
        // let pic1 = this.add.image(0, 0, "pic1");
        let image = this.game.add.image(this.game.cameras.main.width / 2, this.game.cameras.main.height / 2, this.bgName);
        let scaleX = this.game.cameras.main.width / image.width;
        let scaleY = this.game.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
    }
}