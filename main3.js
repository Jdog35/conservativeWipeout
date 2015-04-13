var game = new Phaser.Game(STAGE_WIDTH, STAGE_HEIGHT, Phaser.CANVAS,'',null,false,false);
 
Game = {};
Game.Level0 = function (game) { };
Game.Level0.prototype = {
    create: function () {},
    update: function () {},
    render: function () {},
    shutdown: function () {}

};
 
Game.Level1 = function (game) { };
Game.Level1.prototype = {

    create: function () {},
    update: function () {},
    render: function () {},
    shutdown: function () {}

};


game.state.add('Level0', Game.Level0);
game.state.add('Level1', Game.Level1);


game.state.start('Level0');
