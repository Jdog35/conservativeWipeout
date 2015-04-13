var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div');

var newGame;
var background;
var style;

var menuState = {

    preload: function() {        
        game.load.image('hello', 'assets/hello.png');
        game.load.image('background', 'assets/background.png');
    },
      
    create: function() { 
        background = game.add.tileSprite(0,0, this.world.width, this.world.height,  'background');
        background.autoScroll(-50, 0);
        
        //Add logo
        //var sprite = game.add.sprite(this.world.centerX, this.world.centerY - 100, 'hello');
        //sprite.anchor.setTo(.5, .5);
        var text = "Conservative\n Wipeout";
        var style1 = { font: "65px Arial", fill: "#ff0044", align: "center" };
        
        cWipeout = game.add.text(game.world.centerX, this.world.centerY - 100, text, style1);
        cWipeout.anchor.setTo(.5,.5);
        
        
        //var fontSize = (this.game.device.desktop ? '40px' : '20px');
        style = { font: "30px Arial", fill: "#ff0044", align: "center" };
        newGame = game.add.text(this.world.centerX, this.world.centerY, 'New Game', style);
        newGame.anchor.setTo(.5, .5);
        //newGame.scale.setTo(3, 3);
        
        
        newGame.inputEnabled = true;
        
        //Add event handelers 
        newGame.events.onInputOver.add(this.overNewGame, this);
        newGame.events.onInputOut.add(this.outNewGame, this);
        newGame.events.onInputDown.add(this.playGame, this);
    
    },
    overNewGame: function() {
        
        game.debug.text('OnTest', 32, 32);
        
        //style = { font: "20px Arial" };
//        newGame.scale.setTo(3, 3);
        game.add.tween(newGame.scale)
            .to({x: 1.3, y: 1.3}, 300, Phaser.Easing.Exponential.Out, true);
//        dink.play();
    } ,
    outNewGame: function() {
        
        
        this.game.debug.text('OutTest', 64, 64);
        
        game.add.tween(newGame.scale)
            .to({x: 1, y: 1}, 300, Phaser.Easing.Exponential.Out, true);
    },
    playGame: function() {
        this.game.debug.text('PlayGame', 96, 96);
        this.game.state.start('PlayState');
        console.log(this);
    }
} 

var playState = {
    
    preload: function () {
        
        game.load.image('hello', 'assets/hp_bench.png');
        
    },
    
    create: function() {
        this.game.debug.text('Playstate active', 128, 128);
//        background.autoScroll(50, 0);
    }
} 


game.state.add('MainMenu', menuState);  
game.state.add('PlayState', playState);
game.state.start('MainMenu');  


