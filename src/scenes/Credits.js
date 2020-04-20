class Credits extends Phaser.Scene {
    constructor() {
        super("playCredit");
    }

    preload() {
        this.load.image('credit', './assets/credits.png');
    }

    create() {
        this.credits = this.add.tileSprite(0, 0, 640, 480, 'credit').setOrigin(0, 0);
        keyM = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyM)) {
            this.sound.play('sfx_select');
            this.scene.start("menuScene");
        }
    }
}