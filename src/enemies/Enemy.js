import {isOnTheGround, noGroundOnLeft, noGroundOnRight} from "./entityPositionHelper";
import {playerProps} from '../PlayerProps';
import {isDead} from "./enemyHelper";


const defaultProperties = { attack: 25, hp: 100, direction: 'LEFT', size: {x: 32, y: 50},
    bounce: .1, origin: 0, collideWorld: true, velocity: 50};

export default class Enemy {
    constructor(game, name, animation, dieName, optionalProperties = defaultProperties) {
        this.game = game;
        this.name = name;
        this.animation = animation;
        this.dieName = dieName;
        const op = optionalProperties;
        this.attack = op.attack || defaultProperties.attack;
        this.hp = op.hp || defaultProperties.hp;
        this.direction = op.direction || defaultProperties.direction;
        if (op.size) {
            this.size = op.size || defaultProperties.size;
        } else {
            this.size = defaultProperties.size;
        }
        this.bounce = op.bounce || defaultProperties.bounce;
        this.origin = op.origin || defaultProperties.origin;
        this.collideWorld = op.collideWorld === undefined ? defaultProperties.collideWorld : op.collideWorld;
        this.velocity = op.velocity || defaultProperties.velocity;
    }

    getEnemies() {
        return this.game.enemies.getEnemies(this.name);
    }

    create() {
        for (const enemy of this.getEnemies()) {
            this.createEnemy(enemy);
        }
    }

    createEnemy(enemy) {
        enemy.setPushable(false);
        enemy.direction = this.direction;
        enemy.attack = this.attack;
        enemy.hp = this.hp;
        enemy.setBounce(this.bounce);
        enemy.setOrigin(this.origin);
        enemy.setSize(this.size.x, this.size.y);
        enemy.setCollideWorldBounds(this.collideWorld);
        enemy.name = this.name;
    }


    fight(player, enemy) {
        const playerAnim = player.anims.currentAnim.key;
        const bodyTouch = enemy.body.touching;

        if(playerAnim === "player_attack" && (player.direction === 'RIGHT' && bodyTouch.left
            || player.direction === 'LEFT' && bodyTouch.right)) {
            enemy.hp -= playerProps.attack;
        } else if (bodyTouch.up) {
            this.game.playerObject.lethalJump();
            enemy.hp = 0;
        } else {
            this.game.playerObject.playerGetsHit(enemy.attack)
        }

        if (isDead(enemy)){
            this.enemyDies(enemy);
        }
    }

    playAliveEnemyAnimation(e) {
        e.play(this.animation, true);
    }

    enemyDies(e) {
        e.play(this.dieName, true);
        e.on('animationcomplete', () => e.destroy());
    }
    
    update(layers) {
        for (const enemy of this.getEnemies()) {
            if (enemy.body.blocked.right) {
                this.turnLeft(enemy);
            }

            if (enemy.body.blocked.left) {
                this.turnRight(enemy);
            }

            for (let index = 0; index < layers.length; index++) {
                if (!isOnTheGround(enemy, this.game, layers[index])) {
                    continue;
                }
                if (this.lookToThe(enemy, 'RIGHT') && noGroundOnRight(enemy, this.game, layers[index])) {
                    this.turnLeft(enemy);
                    break;
                }

                if (this.lookToThe(enemy, 'LEFT') && noGroundOnLeft(enemy, this.game, layers[index])) {
                    this.turnRight(enemy)
                    break;
                }
            }

            if (!enemy.velocity) {
                const directionFactor = enemy.direction === 'LEFT' ? -1 : 1;
                enemy.setVelocityX(this.velocity * directionFactor);
            }

            if (!isDead(enemy)) {
                this.playAliveEnemyAnimation(enemy)
            }
        }
    }

    lookToThe(enemy, direction) {
        return enemy.direction === direction;
    }

    turnLeft(enemy) {
        enemy.direction = 'LEFT';
        enemy.flipX = true;
    }

    turnRight(enemy) {
        enemy.direction = 'RIGHT';
        enemy.flipX = false;
    }

    turnToThePlayer(enemy) {
        const player = this.game.playerObject.player;
        if (player.x <= enemy.x) {
            enemy.flipX = true;
            enemy.direction = 'LEFT';
        } else {
            enemy.flipX = false;
            enemy.direction = 'RIGHT';
        }
    }
}
