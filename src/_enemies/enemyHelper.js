import EvilMushroom from "./EvilMushroom";
import Goblin from "./Goblin";
import Owl from "./Owl";
import Skeleton from "./Skeleton";

export const isDead = (e) =>  {
    return e.hp < 1;
}

export const getEnemyData = (name, game) => {
    switch (name) {
        case 'mushrooms':
            return {
                enemyType: new EvilMushroom(game),
                objLayer: 'mushrooms'
            };
        case 'goblins':
            return {
                enemyType: new Goblin(game),
                objLayer: 'goblins'
            };
        case 'owls':
            return {
                enemyType: new Owl(game),
                objLayer: 'owls'
            };
        case 'skeletons':
            return {
                enemyType: new Skeleton(game),
                objLayer: 'skeletons'
            }
    }
}
