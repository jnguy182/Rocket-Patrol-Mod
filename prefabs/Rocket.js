// Rocket prefab
class Rocket extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        // add object to existing scene
        scene.add.existing(this);
        // track rocket's firing status
        this.isFiring = false;
        // add rocket sfx
        this.sfxRocket = scene.sound.add('sfx_rocket');
    }

    update() {
        // left/right movement
        if (!this.isFiring) {
            if (keyLEFT.isDown && this.x >= 0) {
                this.x -= 2;
            } else if (keyRIGHT.isDown && this.x <= 555) {
                this.x += 2;
            }
        }
        // fire button
        if (Phaser.Input.Keyboard.JustDown(keyF) && !this.isFiring) {
            this.isFiring = true;
            // play sfx
            this.sfxRocket.play();
        }
        if (this.isFiring && this.y >= 0) {
            this.y -= 2;
        }
        // reset on miss
        if (this.y <= 0) {
            this.reset();
        }
    }
    // reset rocket to "ground"
    reset() {
        this.isFiring = false;
        this.y = 390;
    }
}