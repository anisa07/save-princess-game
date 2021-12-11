import {isOnTheGround, noGroundOnLeft, noGroundOnRight} from "../entityPositionHelper";
import {playerProps} from '../PlayerProps';
import {isDead} from "./enemyHelper";


const defaultProperties = { attack: 25, hp: 100, direction: 'LEFT', size: {x: 32, y: 50},
    bounce: .1, origin: 0, collideWorld: true, velocity: 50};
const defaultDieAnimation = { src: 'evil_mushroom_die.png', frameWidth: 50, frameHeight: 50, frameRate: 20 };

export default class Enemy {

    constructor(game, name, animation, dieAnimation, optionalProperties = defaultProperties) {
        this.game = game;
        this.name = name;
        this.animation = animation;
        this.animation.name = name + '_move';
        this.dieAnimation = dieAnimation;
        this.dieAnimation.name = name + '_die';
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
        e.play(this.animation.name, true);
    }

    enemyDies(e) {
        e.play(this.dieAnimation.name, true);
        e.on('animationcomplete', () => e.destroy());
    }
    
    update(layers) {
        for (const enemy of this.getEnemies()) {
            this.updateEnemy(enemy, layers);
        }
    }

    updateEnemy(enemy, layers) {
        this.changeDirectionWhileBlocked(enemy);
        this.changeDirectionWhileOnEdge(enemy, layers);
        this.setVelocity(enemy);
        this.whileAlive(enemy);
    }

    whileAlive(enemy) {
        if (!isDead(enemy)) {
            this.playAliveEnemyAnimation(enemy)
        }
    }

    setVelocity(enemy) {
        if (!enemy.velocity) {
            const directionFactor = enemy.direction === 'LEFT' ? -1 : 1;
            enemy.setVelocityX(this.velocity * directionFactor);
        }
    }

    changeDirectionWhileBlocked(enemy) {
        if (enemy.body.blocked.right) {
            this.turnLeft(enemy);
        }
        if (enemy.body.blocked.left) {
            this.turnRight(enemy);
        }
    }

    changeDirectionWhileOnEdge(enemy, layers) {
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


    loadResources() {
        this.game.load.spritesheet(this.animation.name, '../src/assets/enemies/' + this.animation.src,
            {frameWidth: this.animation.frameWidth, frameHeight: this.animation.frameHeight});
        this.game.load.spritesheet(this.dieAnimation.name, '../src/assets/enemies/' + this.dieAnimation.src,
            {frameWidth: this.dieAnimation.frameWidth, frameHeight: this.dieAnimation.frameHeight});
    }

    createResources() {
        this.game.anims.create({
            key: this.animation.name,
            frames: this.game.anims.generateFrameNumbers(this.animation.name),
            frameRate: this.animation.frameRate,
            repeat: -1
        });

        this.game.anims.create({
            key: this.dieAnimation.name,
            frames: this.game.anims.generateFrameNumbers(this.dieAnimation.name),
            frameRate: this.dieAnimation.frameRate,
            repeat: 1
        });
    }

    getObjectLayer(layer) {
        return this.game.map.getObjectLayer(layer).objects || [];
    }
}
