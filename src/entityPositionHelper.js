
// TODO real numbers are bad to use
export const getRightTileUnderEnemy = (enemy, game, layer) =>
    game.map.getTileAtWorldXY(enemy.x + enemy.width, enemy.y + enemy.height, true, null, layer);

// TODO real numbers are bad to use
export const getLeftTileUnderEnemy = (enemy, game, layer) =>
    game.map.getTileAtWorldXY(enemy.x, enemy.y + enemy.height, true, null, layer);

export const getLevelTiledLayerNames = (game) => {
    return game.layers.map(l => (l.layer.layer || {name: ""}).name) || []
}

export const getRandomArbitrary = (min, max) => {
    return Math.random() * (max - min) + min;
}
