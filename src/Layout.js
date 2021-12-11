export class Layout {
    constructor(game, tilemap, assets) {
        this.game = game;
        this.tilemap = tilemap;
        this.assets = assets;
        this.tileset = [];
    }

    load() {
        this.game.layers = [];
        this.assets.forEach((l, i) => {
            const layerName = 'layer' + i;
            this.game.load.image(layerName, l.path);
            this.game.layers.push({name: layerName, layer: {}});
        });
        this.game.load.tilemapTiledJSON(this.tilemap.name, this.tilemap.path);
    }

    create() {
        this.game.map = this.game.make.tilemap({key: this.tilemap.name});
        let i = 0;
        this.game.layers.forEach((l) => {
            const tileset = this.game.map.addTilesetImage(this.assets[i].name, l.name);
            l.layer = this.game.map.createLayer(this.assets[i].layer, tileset, 0, 0);
            this.game.map.setCollisionByProperty({collides: true}, true, true, this.assets[i].layer);
            i++;
        });
        this.game.physics.world.setBounds( 0, 0, this.game.map.widthInPixels, this.game.map.heightInPixels);
    }
}
