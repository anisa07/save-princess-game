export class CommonResources {
    constructor() { }

    load(game) {
        game.load.image('diamond1', '../src/assets/diamond_big_01.png');
        game.load.image('diamond2', '../src/assets/diamond_big_02.png');
        game.load.image('diamond3', '../src/assets/diamond_big_03.png');
        game.load.image('diamond4', '../src/assets/diamond_big_04.png');
        game.load.image('diamond5', '../src/assets/diamond_big_05.png');
        game.load.image('diamond6', '../src/assets/diamond_big_06.png');

        game.load.image('heart1', '../src/assets/heart01.png');
        game.load.image('heart2', '../src/assets/heart02.png');
        game.load.image('heart3', '../src/assets/heart03.png');
        game.load.image('heart4', '../src/assets/heart04.png');
        game.load.image('heart5', '../src/assets/heart05.png');
        game.load.image('heart6', '../src/assets/heart06.png');

        game.load.spritesheet('playerIdle', "../src/assets/PlayerIdle.png", { frameWidth: 45, frameHeight: 45})
        game.load.spritesheet('playerRun', "../src/assets/PlayerRun.png", { frameWidth: 45, frameHeight: 45})
        game.load.spritesheet('playerJump', "../src/assets/PlayerJump.png", { frameWidth: 45, frameHeight: 45})
        game.load.spritesheet('playerFall', "../src/assets/PlayerFall.png", { frameWidth: 45, frameHeight: 45})
        game.load.spritesheet('playerAttack', "../src/assets/PlayerAttack1.png", { frameWidth: 120, frameHeight: 65})
        game.load.spritesheet('playerDeath', "../src/assets/PlayerDeath.png", { frameWidth: 45, frameHeight: 45})
        game.load.spritesheet('playerGetHit', "../src/assets/PlayerGetHit.png", { frameWidth: 45, frameHeight: 45})

        game.load.spritesheet('evilMushroom', "../src/assets/evil_mashroom.png", { frameWidth: 60, frameHeight: 65})
        game.load.spritesheet('evilMushroomDie', "../src/assets/evil_mashroom_die.png", { frameWidth: 50, frameHeight: 50})

        game.load.spritesheet('hopHopGoblin', '../src/assets/Goblin.png', {frameWidth: 150, frameHeight: 150})
        game.load.spritesheet('bigBomb', '../src/assets/Bomb.png', {frameWidth: 50, frameHeight: 50})

        game.load.spritesheet('owlAttack', '../src/assets/enemies/owlAttack.png', {frameWidth: 32, frameHeight: 32});
        game.load.spritesheet('owl', '../src/assets/enemies/owlFly.png', {frameWidth: 32, frameHeight: 32});
        game.load.spritesheet('owlHit', '../src/assets/enemies/owlHit.png', {frameWidth: 32, frameHeight: 32});
        game.load.spritesheet('evilEnergy', '../src/assets/enemies/evilEnergy.png', {frameWidth: 32, frameHeight: 32})
    }

    create(game) {
        game.anims.create({
            key: 'diamond',
            frames: [
                { key: 'diamond1' },
                { key: 'diamond2' },
                { key: 'diamond3' },
                { key: 'diamond4' },
                { key: 'diamond5' },
                { key: 'diamond6' }
            ],
            frameRate: 8,
            repeat: -1
        });
    
        game.anims.create({
            key: 'heart',
            frames: [
                { key: 'heart1' },
                { key: 'heart2' },
                { key: 'heart3' },
                { key: 'heart4' },
                { key: 'heart5' },
                { key: 'heart6' }
            ],
            frameRate: 8,
            repeat: -1
        });game.anims.
    
        game.anims.create({
            key: "player_idle",
            frames: game.anims.generateFrameNumbers("playerIdle"),
            frameRate: 10,
            repeat: -1
        });
    
        game.anims.create({
            key: "player_run",
            frames: game.anims.generateFrameNumbers("playerRun"),
            frameRate: 6,
            repeat: -1
        });
    
        game.anims.create({
            key: "player_jump",
            frames: game.anims.generateFrameNumbers("playerJump"),
            frameRate: 4,
            repeat: -1
        });
    
        game.anims.create({
            key: "player_fall",
            frames: game.anims.generateFrameNumbers("playerFall"),
            frameRate: 4,
            repeat: -1
        });
    
        game.anims.create({
            key: "player_attack",
            frames: game.anims.generateFrameNumbers("playerAttack"),
            frameRate: 6,
            repeat: -1
        });
    
        game.anims.create({
            key: "player_death",
            frames: game.anims.generateFrameNumbers("playerDeath"),
            frameRate: 9,
            repeat: 1
        });
    
        game.anims.create({
            key: "player_get_hit",
            frames: game.anims.generateFrameNumbers("playerGetHit"),
            frameRate: 3,
            repeat: 1
        });
    
        game.anims.create({
            key: "evil_mashroom",
            frames: game.anims.generateFrameNumbers("evilMushroom"),
            frameRate: 13,
            repeat: -1
        });
    
        game.anims.create({
            key: "evil_mashroom_die",
            frames: game.anims.generateFrameNumbers("evilMushroomDie"),
            frameRate: 20,
            repeat: 1
        });

        game.anims.create({
            key: "hop_hop_goblin",
            frames: game.anims.generateFrameNumbers("hopHopGoblin"),
            frameRate: 10,
            repeat: -1
        });

        game.anims.create({
            key: "big_bomb",
            frames: game.anims.generateFrameNumbers("bigBomb"),
            frameRate: 10,
            repeat: 1
        });

        game.anims.create({
            key: "owl_fly",
            frames: game.anims.generateFrameNumbers("owl"),
            frameRate: 10,
            repeat: -1
        });

        game.anims.create({
            key: "owl_attack",
            frames: game.anims.generateFrameNumbers("owlAttack"),
            frameRate: 12,
            repeat: -1
        });

        game.anims.create({
            key: "owl_get_hit",
            frames: game.anims.generateFrameNumbers("owlHit"),
            frameRate: 6,
            repeat: 1
        });

        game.anims.create({
            key: "evil_energy",
            frames: game.anims.generateFrameNumbers("evilEnergy"),
            frameRate: 9,
            repeat: 1
        });

    }
}
