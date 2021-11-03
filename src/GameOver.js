import {playerProps} from './PlayerProps';

export class GameOver extends Phaser.Scene {
    constructor() {
        super({ "key": "GameOver" })
    }

    preload(){

    }

    create(){
        this.add.text(
            this.cameras.main.width / 2, 
            this.cameras.main.height / 2, 
            "Game Over", 
            {
                padding: 10,
                fontSize: 50,
                color: "#FFFFFF",
                fontStyle: "bold",
                backgroundColor: '#FF0000'
            }
        ).setOrigin(0.5);

        this.add.text(
            (this.cameras.main.width / 2), 
            (this.cameras.main.height / 2) + 50, 
            "Click to restart", 
            {
                padding: 10,
                fontSize: 16,
                color: "#FFFFFF",
                fontStyle: "bold",
            }
        )
        .setOrigin(0.5)
        .setPadding(10)
        .setInteractive({ useHandCursor: true })
        .on('pointerup', () => {
            playerProps.initPlayerProps()
            this.scene.start("InitGame");
        })
    }

    update(){
  
    }
}