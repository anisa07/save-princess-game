export class LevelMap {
    constructor(game, resources) {
        this.game = game;
        this.resources = resources;
    }
    load() {
        this.resources.forEach(r => r.load(this.game));
    }
    create() {
        this.resources.forEach(r => r.create(this.game));
    }
}
