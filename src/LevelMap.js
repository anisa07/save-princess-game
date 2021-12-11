export class LevelMap {
    constructor(resources) {
        this.resources = resources;
    }
    load() {
        this.resources.forEach(r => r.load());
    }
    create() {
        this.resources.forEach(r => r.create());
    }
}
