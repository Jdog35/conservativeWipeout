var game = new Phaser.Game(800, 600, Phaser.AUTO, 'game_div', { preload: preload, create: create, update: update, render: render });



function preload() {
        game.load.image('hpBench', 'assets/hp_bench.jpg'); 
        game.load.image('GOhead' , 'assets/georgeOhead.png');
        game.load.image('BorisHead', 'assets/BorisHead.png');
        game.load.image('DavidHead', 'assets/DavidCameron.png');
        game.load.image('RifkindHead', 'assets/RifkindHead.png');
        game.load.image('ship', 'assets/LaserCannon78px.png');
        game.load.image('bullet', 'assets/PinkBplug46px.png');
        
}
    
var bulletTime = 0; 
var bullets;
var score = 0;
var cont;
var contFace = '';

var missionTextObject;
var missionText;

var scoreString = '';
var scoreText;
var style;
var lives;

var timer;
var level = 1;

var stateText;
    
function create() { 
       
        game.physics.startSystem(Phaser.Physics.ARCADE);    
        
    
        //  Background
        game.stage.backgroundColor = '#0072bc';
        var bench = game.add.sprite(0, 100, 'hpBench');
        this.bench1 = game.add.sprite(464, 100, 'hpBench');
        
        
    
        //  Our bullet group
        bullets = game.add.group();
        bullets.enableBody = true;
        bullets.physicsBodyType = Phaser.Physics.ARCADE;
        bullets.createMultiple(30, 'bullet');
       // bullets.setAll('scale.x', .5);
       // bullets.setAll('scale.y', .5);
        bullets.setAll('anchor.x', 0.5);
        bullets.setAll('anchor.y', 1);
        bullets.setAll('outOfBoundsKill', true);
        bullets.setAll('checkWorldBounds', true);

        //Player
        player = game.add.sprite(400, 550, 'ship');
        player.anchor.setTo(0.5, 0.5);
        player.scale.setTo(.5, .5);
        game.physics.enable(player, Phaser.Physics.ARCADE);
        
        
        
        
        //Enemy Conts
        whichCont();
    
        
        this.cont = game.add.sprite(50, 120, contFace );
        this.cont.enableBody = true;
        this.cont.physicsBodyType = Phaser.Physics.ARCADE;
        game.physics.enable(this.cont, Phaser.Physics.ARCADE);
        this.cont.scale.x = 0.4;
        this.cont.scale.y = 0.4;
        
    
       
        //Conts movement
        game.time.events.loop(Phaser.Timer.SECOND, jumpAround, this);
      
        //  The score
        scoreString = 'Score : ';
        scoreText = game.add.text(10, 10, scoreString + score, { font: '34px Arial', fill: '#fff' });
        
        //  Lives
        lives = game.add.group();
        game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '34px Arial', fill: '#fff' });

        for (var i = 0; i < 3; i++) 
        {
            var ship = lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
            ship.anchor.setTo(0.5, 0.5);
            //ship.angle = 90;
            ship.alpha = 0.4;
            ship.scale.x = 0.3;
            ship.scale.y = 0.3;
            console.log(ship);
            
        }
    
        //Timer 
        timer = game.time.create(false);
        timer.loop(5000, updateCounter, this);
    
        timer.start();
        
        //  Text
        stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '84px Arial', fill: '#fff' });
        stateText.anchor.setTo(0.5, 0.5);
        stateText.visible = false;
    
        //Mission
        this.missionText = 'Conty bang';
        this.missionTextObject = game.add.text(20, 420, this.missionText,{ font: '24px Arial', fill: '#fff' });
    
        //  And some controls to play the game with
        cursors = game.input.keyboard.createCursorKeys();
        fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

}
function jumpAround() {
        this.cont.position.setTo(game.world.randomX, game.world.randomY / 1.5); 
    
} 

function whichCont() {
       
       

        switch (level) {
                case 1:
                    contFace =  'GOhead' ;
                    this.missionText = 'Stop this Cont before he sells the NHS for pittance \n for his conies and donor for backhanders';
                    break;
                case 2:
                    contFace =  'BorisHead' ;
                    this.missionText = 'This nutjob will ruin the country!';
                    break;
                case 3:
                    contFace = 'DavidHead' ;
                    this.missionText = 'Blah blah blah!';
                    break;
                case 4:
                    contFace = 'RifkindHead' ;
                    missionText = 'Stop Manic Malcolm selling access to Tory Donors for a five bob and a blowie ' 
                    break;
            };
     
}

function updateCounter () {
        this.cont.kill();
        if (score <= 40) {
            //change to gamestate YOU LOST
            player.kill();
        bullets.destroy();
            
        live = lives.getFirstAlive();

        if (live)
        {
            live.kill();
        }
        if (lives <= 0) {
        stateText.text =" GAME OVER \n Click to restart";
        stateText.visible = true;
        }
        
        score = 0;
            
        //the "click to restart" handler
        game.input.onTap.addOnce(restart,this);
        
        }
        else {
            
            if (level < 4) {
            level++;
            
            whichCont();
            this.cont = game.add.sprite(50, 120, contFace );
                
            }
            else {
            level = 1;
            
            whichCont();
            
            this.cont = game.add.sprite(50, 120, contFace );
            stateText.text =" You Won, \n Click to restart";
            stateText.visible = true;
            
           
            //bullets.kill();
            //the "click to restart" handler
            game.input.onTap.addOnce(restart,this);
            }
        }
        
        
            
    
}

function update() {
       
        if (game.input.keyboard.isDown(Phaser.Keyboard.LEFT))
    {
        player.x -= 4;
    }
    else if (game.input.keyboard.isDown(Phaser.Keyboard.RIGHT))
    {
        player.x += 4;
    }
    //  Firing?
        if (fireButton.isDown)
        {
            fireBullet();
            console.log();
        }
        
        //  Run collision
        game.physics.arcade.overlap(bullets, cont, collisionHandler, null, this);
        //game.physics.arcade.overlap(enemyBullets, player, enemyHitsPlayer, null, this);
    
        
    
    
} 
function render () {
    game.debug.spriteInfo(this.cont, 300, 420);
    
    game.debug.text('Time left to stop the evil CONT: ' + timer.duration.toFixed(0), 320, 32);
    game.debug.text('CONT Level: ' + level, 32, 64);
    console.log(contFace);
}


function collisionHandler (bullet, cont) {

    //  When a bullet hits an alien we kill them both
    //bullet.kill();
    cont.kill();

    //  Increase the score
    score += 20;
    scoreText.text = scoreString + score;
}

function fireBullet () {

    //  To avoid them being allowed to fire too fast we set a time limit
    if (game.time.now > bulletTime)
    {
        //  Grab the first bullet we can from the pool
        bullet = bullets.getFirstExists(false);

        if (bullet)
        {
            //  And fire it
            bullet.reset(player.x, player.y + 8);
            bullet.body.velocity.y = -400;
            bulletTime = game.time.now + 200;
        }
    }

}

function resetBullet (bullet) {

    //  Called if the bullet goes out of the screen
    bullet.kill();

}

function restart () {

    //  A new level starts
    
    //resets the life count
    lives.callAll('revive');
    //  And brings the aliens back from the dead :)
    //aliens.removeAll();
    //createAliens();
    
    //hides the text
    stateText.visible = false;
    //stateText.text =" Boom";
    
    //revives the player
    player.revive();
    bullets.revive();
    
    

}