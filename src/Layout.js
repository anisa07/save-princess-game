export class Layout {
    constructor(tilemap, assets) {
        this.tilemap = tilemap;
        this.assets = assets;
        this.tileset = [];
    }

    load(game) {
        game.layers = [];
        this.assets.forEach((l, i) => {
            const layerName = 'layer' + i;
            game.load.image(layerName, l.path);
            game.layers.push({name: layerName, layer: {}});
        });
        game.load.tilemapTiledJSON(this.tilemap.name, this.tilemap.path);
    }

    create(game) {
        game.map = game.make.tilemap({key: this.tilemap.name});
        let i = 0;
        game.layers.forEach((l) => {
            const tileset = game.map.addTilesetImage(this.assets[i].name, l.name);
            l.layer = game.map.createLayer(this.assets[i].layer, tileset, 0, 0);
            game.map.setCollisionByProperty({collides: true}, true, true, this.assets[i].layer);
            i++;
        });
        game.physics.world.setBounds( 0, 0, game.map.widthInPixels, game.map.heightInPixels);
    }
}
