import {isOnTheGround, noGroundOnLeft, noGroundOnRight} from "../entityPositionHelper";
import {playerProps} from '../PlayerProps';
import {isDead} from "./enemyHelper";
import {Shot} from "./Shot";


const defaultDieAnimation = { src: 'evil_mushroom_die.png', frameWidth: 50, frameHeight: 50, frameRate: 20 };
const defaultShotAnimation = { src: 'thrown_sword.png', frameWidth: 50, frameHeight: 50, frameRate: 20 };

const defaultProperties = { attack: 25, hp: 100, direction: 'LEFT', movement: 'walk', size: {x: 32, y: 50},
    bounce: .1, origin: 0, collideWorld: true, velocity: 50, hitOnTouch: true, followPlayer: false,
    dieAnimation: defaultDieAnimation, shotAnimation: defaultShotAnimation
};

export default class Enemy {
    constructor(game, name, animation, optionalProperties = defaultProperties) {
        this.game = game;
        this.name = name;
        this.animation = animation;
        this.animation.name = name;
        const op = optionalProperties;
        this.attack = op.attack || defaultProperties.attack;
        this.hp = op.hp || defaultProperties.hp;
        this.direction = op.direction || defaultProperties.direction;
        this.movement = op.movement || defaultProperties.movement;
        if (op.size) {
            this.size = op.size || defaultProperties.size;
        } else {
            this.size = defaultProperties.size;
        }
        this.bounce = op.bounce || defaultProperties.bounce;
        this.origin = op.origin || defaultProperties.origin;
        this.collideWorld = op.collideWorld === undefined ? defaultProperties.collideWorld : op.collideWorld;
        this.velocity = op.velocity || defaultProperties.velocity;
        this.hitOnTouch = op.hitOnTouch !== undefined ? op.hitOnTouch : defaultProperties.hitOnTouch;
        this.followPlayer = op.followPlayer !== undefined ? op.followPlayer : defaultProperties.followPlayer;

        if (op.dieAnimation) {
            this.dieAnimation = op.dieAnimation;
            this.dieAnimation.name = name + '_die';
        }

        if (op.shotAnimation) {
            this.shotAnimation = op.shotAnimation;
            this.shotAnimation.name = name + '_shot';
            this.timers = { };
        }
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
            if (this.hitOnTouch) {
                this.game.playerObject.playerGetsHit(enemy.attack);
            }
        }

        if (isDead(enemy)){
            this.enemyDies(enemy);
        }
    }

    playAliveEnemyAnimation(e) {
        e.play(this.animation.name, true);
    }

    enemyDies(e) {
        if (!this.dieAnimation) return;
        e.play(this.dieAnimation.name, true);
        e.on('animationcomplete', () => e.destroy());
    }

    shoot(enemy) {
        if (!this.shotAnimation) return;
        const key = `timerId${enemy.index}`;
        if (this.timers[key]) {
            return;
        }

        this.timers[key] = setTimeout(() => {
            if (this.followPlayer) {
                this.turnToThePlayer(enemy);
            }
            const offset = this.getShotOffset(this.shotAnimation.startShot);
            this.shot = new Shot(this.game, this.shotAnimation.name, { x: enemy.x + offset.x, y: enemy.y + offset.y }, enemy.attack, enemy.direction, this.shotAnimation);
            this.shot.update();
            clearTimeout(this.timers[key]);
            this.timers[key] = undefined
        }, this.shotAnimation.timeout);
    }

    getShotOffset(startShot) {
        switch (startShot) {
            case 'top':
                return {x: this.size.x / 2, y: -this.size.y /2 };
            case 'middle':
                return {x: this.size.x / 2, y: 0 };
            case 'bottom':
                return {x: this.size.x / 2, y: this.size.y /2 };
        }
    }

    update(layers) {
        for (const enemy of this.getEnemies()) {
            this.updateEnemy(enemy, layers);
        }
    }

    updateEnemy(enemy, layers) {
        this.move(this.movement, enemy, layers);
        this.whileAlive(enemy);
        if (this.shotAnimation) {
            this.shoot(enemy);
        }
    }

    move(movement, enemy, layers) {
        switch (movement) {
            case 'walk':
                this.changeDirectionWhileBlocked(enemy);
                this.setVelocity(enemy);
                this.changeDirectionWhileOnEdge(enemy, layers);
                break;
            case 'fly':
                enemy.body.allowGravity = false;
                this.changeDirectionWhileBlocked(enemy);
                this.setVelocity(enemy);
                break;
            case 'on_hold':
                this.turnToThePlayer(enemy);
                break;
        }
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
        if (player.x <= enemy.x + this.size.x * 1.5) {
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
        if (this.dieAnimation) {
            this.game.load.spritesheet(this.dieAnimation.name, '../src/assets/enemies/' + this.dieAnimation.src,
                {frameWidth: this.dieAnimation.frameWidth, frameHeight: this.dieAnimation.frameHeight});
        }
        if (this.shotAnimation) {
            this.game.load.spritesheet(this.shotAnimation.name, '../src/assets/enemies/' + this.shotAnimation.src,
                {frameWidth: this.shotAnimation.frameWidth, frameHeight: this.shotAnimation.frameHeight});
        }
    }

    createResources() {
        this.game.anims.create({
            key: this.animation.name,
            frames: this.game.anims.generateFrameNumbers(this.animation.name),
            frameRate: this.animation.frameRate,
            repeat: -1
        });

        if (this.dieAnimation) {
            this.game.anims.create({
                key: this.dieAnimation.name,
                frames: this.game.anims.generateFrameNumbers(this.dieAnimation.name),
                frameRate: this.dieAnimation.frameRate,
                repeat: 1
            });
        }

        if (this.shotAnimation) {
            this.game.anims.create({
                key: this.shotAnimation.name,
                frames: this.game.anims.generateFrameNumbers(this.shotAnimation.name),
                frameRate: this.shotAnimation.frameRate,
                repeat: -1
            });
        }
    }

    getObjectLayer(layer) {
        return this.game.map.getObjectLayer(layer).objects || [];
    }
}
