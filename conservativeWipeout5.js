var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game_div', { preload: preload, create: create, update: update, render: render });

function preload() {
    game.load.image('gun', 'assets/georgeOhead.png');
}

var s;

function create() {
    game.stage.backgroundColor = '#0072bc';
    s = game.add.sprite(game.world.centerX, game.world.centerY, 'gun');
    s.anchor.setTo(0.5, 0.5);
    s.scale.setTo(.5, .5);

    //s.animations.add('gun');
    //s.animations.play('gun', 10, true);
    
    var tween = game.add.tween(s);
        
    tween.to({ x: 600 }, 3000, Phaser.Easing.Quadratic.InOut, true, 0, 1000, true);


//game.time.events.loop(Phaser.Timer.SECOND, fadePicture, this);
}
function fadePicture() {
   s.position.setTo(game.world.randomX, game.world.randomY / 1.5);
} 

function update() {
   
    
    //game.time.events.add(2000, function() {
      //  s.position.setTo(game.world.randomX, game.world.randomY);
      //}
    /*
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
*/
}

function render() {
    game.debug.spriteInfo(s, 20, 32);

}