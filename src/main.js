/*
Jake Nguyen
jnguy182
Section H

10 - Add your own (copyright-free) background music to the Play scene
        *I added a background music on loop throughout the game.

15 - Create a new title screen
        *Brand new main menu that I made with credits!
        
15 - Implement parallax scrolling
        *5 layers of spreadsheets used to make parallax scrolling.

25 - Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points
        *A helicopter was added, but it's big. But, it's really faster and more points.

25 - Create new artwork for all of the in-game assets (rocket, spaceships, explosion)
        *Most of the assets (the 8-bit ones) were made through Adobe Illustrator.

50 - Redesign the game's artwork and sound to change its theme/aesthetic (to something other than sci-fi)
        *New theme that takes place on the desert climate of Earth.

*/

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Music, Menu, Play, Credits]
}

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000
}

// reserve keyboard vars
let keyF, keyLEFT, keyRIGHT, keyC, keyM;