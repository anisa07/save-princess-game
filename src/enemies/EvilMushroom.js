import Enemy from "./Enemy";

export default class EvilMushroom extends Enemy {
    constructor(game) {
        super(game, 'evilMushroom', 'evil_mushroom','evil_mushroom_die');
    }

    loadResources() {
        this.game.load.spritesheet('evilMushroom', "../src/assets/enemies/evil_mushroom.png", { frameWidth: 60, frameHeight: 65});
        this.game.load.spritesheet('evilMushroomDie', "../src/assets/enemies/evil_mushroom_die.png", { frameWidth: 50, frameHeight: 50});
    }

    createResources() {
        this.game.anims.create({
            key: "evil_mushroom",
            frames: this.game.anims.generateFrameNumbers("evilMushroom"),
            frameRate: 13,
            repeat: -1
        });

        this.game.anims.create({
            key: "evil_mushroom_die",
            frames: this.game.anims.generateFrameNumbers("evilMushroomDie"),
            frameRate: 20,
            repeat: 1
        });
    }
}
