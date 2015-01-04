/* 
*  Development by DropDead Games
*  www.dropdeadgames.org
*  Jacob Colborn
*  email: jcolborn@dropdeadgames.org
*  The right to use this code is subject to the license binding this game.
*/

Game = {};

var tileSize = 32;
var width = tileSize * 12;
var height = tileSize * 10;
var coins = 0;
var level = ['map', 'map1', 'map2'];

Game.Boot = function (game) { };

Game.Boot.prototype = {
    
    preload: function () {
        // Load the 'loading' sprite
        game.stage.backgroundColor = '#0000ff';
        game.load.image('loading', '/images/loading.png');
    }, 
    
    create: function() {
        // Start the 'Load' game state
        this.game.state.start('Load');
    },
};

Game.Load = function (game) { };

Game.Load.prototype = {
    
	preload: function () {
		preloading = game.add.sprite(width/2, height/2+19, 'loading');
		preloading.x -= preloading.width/2;
		game.load.setPreloadSprite(preloading); // Show the loading sprite as the game loads
        // Loads tilemap levels
        game.load.tilemap('map', 'assets/tilemap.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map1', 'assets/tilemap1.json', null, Phaser.Tilemap.TILED_JSON);
        game.load.tilemap('map2', 'assets/tilemap2.json', null, Phaser.Tilemap.TILED_JSON);
        
        game.load.image('tileset', 'images/tileset.png');
		game.load.image('player', 'images/player.png');
		game.load.image('ladder', 'images/ladder.png');
		game.load.image('gem', 'images/gem.png');
        game.load.image('menu', 'images/menu.png');
        
        game.load.audio('music', 'audio/sound.mp3');
	},
    
	create: function () {
        // Once the game loads, go the 'menu'
		game.state.start('Menu');
	}
};