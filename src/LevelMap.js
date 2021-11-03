export class LevelMap {
    constructor(resources) {
        this.resources = resources;
    }
    load() {
        this.resources.forEach(r => r.load());
        // this.load.image('diamond1', '../src/assets/diamond_big_01.png');
        // this.load.image('diamond2', '../src/assets/diamond_big_02.png');
        // this.load.image('diamond3', '../src/assets/diamond_big_03.png');
        // this.load.image('diamond4', '../src/assets/diamond_big_04.png');
        // this.load.image('diamond5', '../src/assets/diamond_big_05.png');
        // this.load.image('diamond6', '../src/assets/diamond_big_06.png');

        // this.load.spritesheet("eyeMonster", "../src/assets/eye_monster_idle7.png", { frameWidth: 150, frameHeight: 128} );
        // this.load.spritesheet('evilMashroom', "../src/assets/evil_mashroom.png", { frameWidth: 60, frameHeight: 65})
        // this.load.spritesheet('evilMashroomDie', "../src/assets/evil_mashroom_die.png", { frameWidth: 50, frameHeight: 50})       
    }
    create() {
        this.resources.forEach(r => r.create());
    }
}