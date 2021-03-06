// We start by initializing Phaser
// Parameters: width of the game, height of the game, how to render the game, the HTML div that will contain the game
var game = new Phaser.Game(500, 600, Phaser.AUTO, 'game_div');

// And now we define our first and only state, I'll call it 'main'. A state is a specific scene of a game like a menu, a game over screen, etc.
var main_state = {

    preload: function() {
        // Load a sprite in the game
// Parameters: name of the sprite, path to the image
game.load.image('hello', 'assets/hello.png');  // Everything in this function will be executed at the beginning. That’s where we usually load the game’s assets (images, sounds, etc.)
    },

    create: function() { 
        // Display a sprite on the screen
// Parameters: x position, y position, name of the sprite
this.hello_sprite = game.add.sprite(250, 300, 'hello');
        
        var text = "- phaser -\n with a sprinkle of \n pixi dust.";
        var style = { font: "65px Arial", fill: "#ff0044", align: "center" };

        var t = game.add.text(game.world.centerX-300, 0, text, style);
// This function will be called after the preload function. Here we set up the game, display sprites, add labels, etc.
    },

    update: function() {
        // Increase the angle of the sprite by one degree
this.hello_sprite.angle += 1;  // This is where we will spend the most of our time. This function is called 60 times per second to update the game.
    } 
}

// And finally we tell Phaser to add and start our 'main' state
game.state.add('main', main_state);  
game.state.start('main');  