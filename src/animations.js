export default scene => {
    scene.anims.create({
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

    scene.anims.create({
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
    });

    scene.anims.create({
        key: "player_idle",
        frames: scene.anims.generateFrameNumbers("playerIdle"),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: "player_run",
        frames: scene.anims.generateFrameNumbers("playerRun"),
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: "player_jump",
        frames: scene.anims.generateFrameNumbers("playerJump"),
        frameRate: 4,
        repeat: -1
    });

    scene.anims.create({
        key: "player_fall",
        frames: scene.anims.generateFrameNumbers("playerFall"),
        frameRate: 4,
        repeat: -1
    });

    scene.anims.create({
        key: "player_attack",
        frames: scene.anims.generateFrameNumbers("playerAttack"),
        frameRate: 6,
        repeat: -1
    });

    scene.anims.create({
        key: "player_death",
        frames: scene.anims.generateFrameNumbers("playerDeath"),
        frameRate: 9,
        repeat: 1
    });

    scene.anims.create({
        key: "player_get_hit",
        frames: scene.anims.generateFrameNumbers("playerGetHit"),
        frameRate: 3,
        repeat: 1
    });

    scene.anims.create({
        key: "evil_mashroom",
        frames: scene.anims.generateFrameNumbers("evilMushroom"),
        frameRate: 13,
        repeat: -1
    });

    scene.anims.create({
        key: "evil_mashroom_die",
        frames: scene.anims.generateFrameNumbers("evilMushroomDie"),
        frameRate: 20,
        repeat: 1
    });

}
