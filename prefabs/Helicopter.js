// Helicopter prefab
class Helicopter extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, texture, frame, pointValue) {
        super(scene, x, y, texture, frame);
        // add to existing scene, displayList, updateList
        scene.add.existing(this);
        // store pointValue
        this.points = pointValue;
    }

    update() {
        // move helicopter left
        this.x += game.settings.spaceshipSpeed * 3;
        // wraparound from left to right edge
        if (this.x >= game.config.width + this.width * 0.07 + 1000) {
            this.reset();
        }
    }

    reset() {
        this.x = 0 - this.width * 0.07;
    }
}