class Music extends Phaser.Scene {
    constructor() {
        super("musicScene");
    }

    preload() {
        this.load.audio('music', './assets/music.mp3');
    }

    create() {
        this.music = this.sound.add("music");
        let musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
        this.scene.start("menuScene");
    }
}