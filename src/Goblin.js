import Bomb from './Bomb';

let timerId;

export class Goblin {
    constructor(game) {
        this.game = game;
        this.bomb = null;
    }

    create() {
        for (const enemy of this.game.enemy.enemies.children.entries) {
            if (enemy.texture.key === 'hopHopGoblin') {
                enemy.setPushable(false);
                enemy.attack = 50;
                enemy.hp = 100;
                enemy.setBounce(.1);
                enemy.setOrigin(0);
                enemy.setSize(32, 50);
                enemy.setCollideWorldBounds(true);
                enemy.name = 'hopHopGoblin'
            }
        }

        this.game.physics.add.collider(this.game.playerObject.player, this.game.enemy.enemies, this.fight, null, this);
    }

    isDead(e) {
        return e.hp < 1;
    }

    playAliveEnemyAnimation(e) {
        e.play('hop_hop_goblin', true)
    }

    throughBomb(enemy) {
        if (timerId) {
            return;
        }

        timerId = setTimeout(() => {
            const x = enemy.direction === 'LEFT' ? enemy.x : enemy.x + 32;
            this.bomb = new Bomb(this.game);
            this.bomb.create(x, enemy.y, 'big_bomb', 'goblinBomb', enemy.attack, enemy.direction);
            this.bomb.update();
            clearTimeout(timerId);
            timerId = undefined
        }, 1000);
    }

    update() {
        for (const enemy of this.game.enemy.enemies.children.entries) {
            if (enemy.name === 'hopHopGoblin') {
                const player = this.game.playerObject.player;
                if (player.x <= enemy.x) {
                    enemy.flipX = true;
                    enemy.direction = 'LEFT';
                } else {
                    enemy.flipX = false;
                    enemy.direction = 'RIGHT';
                }
                this.throughBomb(enemy);
                !this.isDead(enemy) && this.playAliveEnemyAnimation(enemy)
            }
        }
    }

    fight() {
    }
}
