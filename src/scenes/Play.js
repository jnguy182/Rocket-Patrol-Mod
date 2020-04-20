class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        // load images/tile sprites
        this.load.image('rocket', './assets/Player.png');
        this.load.image('spaceship', './assets/sheep.png');
        this.load.image('helicopter', './assets/heli.png');

        // load parallax images
        this.load.image('sky', './assets/1.png');
        this.load.image('canyon', './assets/2.png');
        this.load.image('desert', './assets/3.png');
        this.load.image('cactus', './assets/4.png');
        this.load.image('sand', './assets/5.png');

        // load spritesheet
        this.load.spritesheet('explosion', './assets/explosion.png', {
            frameWidth: 64,
            frameHeight: 32,
            startFrame: 0,
            endRame: 9
        });
    }

    create() {
        // place tile sprite for parallax
        this.sky = this.add.tileSprite(0, 0, 640, 480, 'sky').setOrigin(0, 0);
        this.canyon = this.add.tileSprite(0, 0, 640, 480, 'canyon').setOrigin(0, 0);
        this.desert = this.add.tileSprite(0, 0, 640, 480, 'desert').setOrigin(0, 0);
        this.cactus = this.add.tileSprite(0, 0, 640, 480, 'cactus').setOrigin(0, 0);
        this.sand = this.add.tileSprite(0, 0, 640, 480, 'sand').setOrigin(0, 0);

        // add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width / 2 - 8, 390, 'rocket').setScale(0.02, 0.02).setOrigin(0, 0);

        // add spaceships (x3)
        this.helicopter = new Helicopter(this, 0, 132, 'helicopter', 0, 30).setScale(0.07, 0.07);
        this.ship02 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setScale(0.02, 0.02).setOrigin(0, 0);
        this.ship03 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setScale(0.02, 0.02).setOrigin(0, 0);

        // define keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // animation config
        this.anims.create({
            key: 'explode',
            frames: this.anims.generateFrameNumbers('explosion', {
                start: 0,
                end: 9,
                first: 0
            }),
            frameRate: 30
        });

        // score
        this.p1Score = 0;

        // score display
        let scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        this.scoreLeft = this.add.text(69, 54, this.p1Score, scoreConfig);

        // game over flag
        this.gameOver = false;

        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width / 2, game.config.height / 2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width / 2, game.config.height / 2 + 64, '(F)ire to Restart or ← for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
        }, null, this);
    }

    update() {
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
        }
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        // scroll tile sprite
        this.sky.tilePositionX += 0.025;
        this.canyon.tilePositionX += 0.05;
        this.desert.tilePositionX += 0.5;
        this.cactus.tilePositionX += 0.5;
        this.sand.tilePositionX += 2;

        if (!this.gameOver) {
            // update rocket sprite
            this.p1Rocket.update();
            // update spaceships (x3)
            this.helicopter.update();
            this.ship02.update();
            this.ship03.update();
        }

        // check collisions
        if (this.checkCollision(this.p1Rocket, this.ship03)) {
            console.log('kaboom ship 03');
            this.p1Rocket.reset();
            this.shipExplode(this.ship03);
        }
        if (this.checkCollision(this.p1Rocket, this.ship02)) {
            console.log('kaboom ship 02');
            this.p1Rocket.reset();
            this.shipExplode(this.ship02);
        }
        if (this.checkHelision(this.p1Rocket, this.helicopter)) {
            console.log('kaboom ship 01');
            this.p1Rocket.reset();
            this.shipExplode(this.helicopter);
        }

    }

    checkCollision(rocket, ship) {
        // simple AABB checking
        if (rocket.x < ship.x + ship.width * 0.02 &&
            rocket.x + rocket.width * 0.02 > ship.x &&
            rocket.y < ship.y + ship.height * 0.02 &&
            rocket.height * 0.02 + rocket.y > ship.y) {
            return true;
        } else {
            return false;
        }
    }

    checkHelision(rocket, helicopter) {
        if (rocket.x < helicopter.x + helicopter.width * 0.07 &&
            rocket.x + rocket.width * 0.02 > helicopter.x &&
            rocket.y < helicopter.y + helicopter.height * 0.07 &&
            rocket.height * 0.02 + rocket.y > helicopter.y) {
            return true;
        } else {
            return false;
        }
    }

    shipExplode(ship) {
        // temporarily hide ship
        ship.alpha = 0;

        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);

        // play explode animation
        boom.anims.play('explode');

        // callback after animation completes
        boom.on('animationcomplete', () => {
            // reset ship position
            ship.reset();
            // make ship visible again
            ship.alpha = 1;
            // remove explosion sprite
            boom.destroy();
        });

        // score increment and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;
        this.sound.play('sfx_explosion');
    }
}