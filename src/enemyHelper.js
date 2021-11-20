import EvilMushroom from "./EvilMushroom";
import Goblin from "./Goblin";

export const isDead = (e) =>  {
    return e.hp < 1;
}

export const getEnemyData = (name, game) => {
    switch (name) {
        case 'mushrooms':
            return {
                enemyType: new EvilMushroom(game),
                enemyPic: 'evilMushroom',
                enemyObjects: game.map.getObjectLayer('mushrooms').objects || []
            };
        case 'goblins':
            return {
                enemyType: new Goblin(game),
                enemyPic: 'hopHopGoblin',
                enemyObjects: game.map.getObjectLayer('goblins').objects || []
            };
    }
}
