/* 
*  Development by DropDead Games
*  www.dropdeadgames.org
*  Jacob Colborn
*  email: jcolborn@dropdeadgames.org
*  The right to use this code is subject to the license binding this game.
*/

var levelSelect = 0;

Game.Play = function (game) { };

Game.Play.prototype = {
    
    create: function () {       
        game.physics.startSystem(Phaser.Physics.ARCADE);
        // Initialization for the cursor keys used in player movement
        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.soundKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        
        this.loadMap();
        // Loads the player with the playerStart position from Tiled
        var result = this.findObjectsByType('playerStart', this.map, 'objectsLayer');
        this.player = this.game.add.sprite(result[0].x, result[0].y, 'player');
        this.game.physics.arcade.enable(this.player);
        this.player.body.collideWorldBounds = false;
        this.player.body.gravity.y = 1000;
        this.game.camera.follow(this.player); // Sets the camera to follow the player object
        this.player.events.onOutOfBounds.add(this.restartGame, this);
        
        // Label to give the amount of coins collected per level
        this.labelCoin = game.add.text(20, 20, '0', {font: '30px Arial', fill: '#ffff00'});
        this.labelCoin.fixedToCamera = true; // Fixes the position of this label in the camera coordinates
    },
    
    update: function() {
        // Collision detection on the player and different objects
        this.game.physics.arcade.collide(this.player, this.blockedlayer); // Player and the blockedLayer of the tilemap
        this.game.physics.arcade.overlap(this.player, this.coin, this.collect, null, this); // Player and the gems
        this.game.physics.arcade.overlap(this.player, this.flag, this.nextLevel, null, this); // Player and the ladder
        
        this.player.body.velocity.y = 0; // Set players velocity to 0 after every update
        this.player.body.velocity.x = 0;
        // Cursor keys to control the player
        if (this.cursors.up.isDown) {
            this.player.body.velocity.y -= 50;
        }
        else if (this.cursors.down.isDown) {
            this.player.body.velocity.y += 50;
        }
        if (this.cursors.left.isDown) {
            this.player.body.velocity.x -= 50;
        }
        else if (this.cursors.right.isDown) {
            this.player.body.velocity.x += 50;
        }
        
        if (this.soundKey.isDown) {
            gameMusic.pause();
        }
    },
        
    loadMap: function() {       
        // Loads the tilemap from Tiled
        this.map = game.add.tilemap(level[levelSelect]); // Declaration given to tilemap asset in load.js
        this.map.addTilesetImage('tileset', 'tileset'); // f1 is tileset name in Tiled, f2 is the name of the tileset in load.js
        this.backgroundlayer = this.map.createLayer('backgroundLayer'); // Creates the 3 layers defined by the tilemap
        this.blockedlayer = this.map.createLayer('blockedLayer'); // Creates the 3 layers defined by the tilemap
        this.map.setCollisionBetween(1, 4000, true, 'blockedLayer'); // Creates the 3 layers defined by the tilemap
        this.backgroundlayer.resizeWorld(); // Resizes the world based on the backgroundLayer property
        
        this.createCoins();  // Call to create items
        this.createFlag(); // Call to create laddders
    },
    
    createCoins: function() {
        // Creates a group and filles it based on the 'item' type in the Tiled tilemap
        this.coins = this.game.add.group();
        this.coins.enableBody = true;
        var item;
        result = this.findObjectsByType('coin', this.map, 'objectsLayer'); // item defined in tilemap, objectsLayer defined in tilemap
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.coins);
        }, this);
    },
    
    createFlag: function() {
        // Creates a group and fills it based on the 'ladder' type in the Tiled tiledmap
        this.flag = this.game.add.group();
        this.flag.enableBody = true;
        result = this.findObjectsByType('flag', this.map, 'objectsLayer');
        result.forEach(function(element) {
            this.createFromTiledObject(element, this.flag);
        }, this);
    },
    
    findObjectsByType: function(type, map, layer) {    
        // Loads the objects from the objectsLayer of the Tiled tilemap into the results array
        var result = new Array();
        map.objects[layer].forEach(function(element) {
            if (element.properties.type === type) {
                element.y -= map.tileHeight;
                result.push(element);
            }
        });
        return result;
    },
    
    createFromTiledObject: function(element, group) {
        // Loads the sprite that is defined by the sprite property of the object in Tiled
        var sprite = group.create(element.x, element.y, element.properties.sprite);
        Object.keys(element.properties).forEach(function(key) {
            sprite[key] = element.properties[key];
        });
    },
    
    nextLevel: function() {
        // Loads the next level if the player gets to the flag
        levelSelect += 1;
        coins = 0;
        game.state.start('Play');
        }
    },
    
    collect: function(player, collectable) {
        // Collects the gems for the player
        coins += 1;
        this.labelGem.text = coins;
        console.log('collected');
        collectable.destroy();
    },
        
    restartGame: function() {
        coins = 0;
        game.state.start('Play');
    },
};