export class Background {
    constructor(name) {
        this.name = name;
        this.bgName = 'background';
    }

    load(game) {
        game.load.image(this.bgName, this.name);
    }

    create(game) {
        // let pic1 = this.add.image(0, 0, "pic1");
        let image = game.add.image(game.cameras.main.width / 2, game.cameras.main.height / 2, this.bgName);
        let scaleX = game.cameras.main.width / image.width;
        let scaleY = game.cameras.main.height / image.height;
        let scale = Math.max(scaleX, scaleY);
        image.setScale(scale).setScrollFactor(0);
    }
}
