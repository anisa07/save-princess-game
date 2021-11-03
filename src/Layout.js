export class Layout {
    constructor(game, tilemap, assets) {
        this.game = game;
        this.tilemap = tilemap;
        this.assets = assets;
        this.layers = [];
        this.tileset = [];
        this.status = 'init';
    }
    load() {
        if (this.status !== 'init') return;
        this.assets.forEach((l, i) => {
            const layerName = 'layer' + i;
            this.game.load.image(layerName, l.path);
            this.layers.push({name: layerName, layer: {}});
        });
        this.game.load.tilemapTiledJSON(this.tilemap.name, this.tilemap.path);
        this.status = 'loaded';
    }

    create() {
        if (this.status !== 'loaded') return;
        this.game.map = this.game.make.tilemap({key: this.tilemap.name});
        let i = 0;
        this.layers.forEach((l) => {
            console.log(this.assets[i].name, l.name)
            const tileset = this.game.map.addTilesetImage(this.assets[i].name, l.name);
            l.layer = this.game.map.createLayer(this.assets[i].layer, tileset, 0, 0);
            // this.backgroundLayer1.setCollisionBetween(0, 300);
            this.game.map.setCollisionByProperty({collides: true}, true, true, this.assets[i].layer);
            i++;
        });
        this.game.physics.world.setBounds( 0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);
        this.status = 'created';
    }
    
    collide(actors) {
        this.layers.forEach((l) => {
            this.game.physics.add.collider(actors, l.layer);
        });
    }
}