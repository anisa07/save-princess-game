
// TODO real numbers are bad to use
export const noGroundOnRight = (enemy, game, layer) => {
    const tileUnder = findTileBelow(enemy.width, enemy, game, layer);
    return tileUnder && !tileUnder.canCollide;
}

// TODO real numbers are bad to use
export const noGroundOnLeft = (enemy, game, layer) => {
    const tileUnder = findTileBelow(0, enemy, game, layer);
    return tileUnder && !tileUnder.canCollide;
}

// TODO real numbers are bad to use
export const isOnTheGround = (enemy, game, layer) => {
    const tileUnder = findTileBelow(enemy.width / 2, enemy, game, layer);
    return tileUnder && tileUnder.canCollide;
}

const findTileBelow = (offset, enemy, game, layer)  =>
    game.map.getTileAtWorldXY(enemy.x + offset, enemy.y + enemy.height, true, null, layer);

export const getLevelTiledLayerNames = (game) => {
    return game.layers.map(l => (l.layer.layer || {name: ""}).name) || []
}

export const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}
