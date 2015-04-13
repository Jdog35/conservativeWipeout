var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game_div', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('gun', 'assets/shotgun2.png');
}

var s;

function create() {
    game.stage.backgroundColor = '#0072bc';
    s = game.add.sprite(game.world.centerX, game.world.centerY, 'gun');
    s.anchor.setTo(0.5, 0.5);
    s.scale.setTo(.5, .5);

    //s.animations.add('run');
    //s.animations.play('run', 10, true);

}

function update() {

    if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        s.x -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        s.x += 4;
    }

    if (game.input.keyboard.isDown(Phaser.Keyboard.UP))
    {
        s.y -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.DOWN))
    {
        s.y += 4;
    }

}

function render() {
    game.debug.spriteInfo(s, 20, 32);

}