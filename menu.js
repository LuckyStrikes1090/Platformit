/* 
*  Development by DropDead Games
*  www.dropdeadgames.org
*  Jacob Colborn
*  email: jcolborn@dropdeadgames.org
*  The right to use this code is subject to the license binding this game.
*/

Game.Menu = function (game) { };

Game.Menu.prototype = {
    
    create: function() {
        
        this.cursor = this.game.input.keyboard.createCursorKeys();
        this.soundKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
        var logo = game.add.sprite(width/2, -150, 'menu');
        logo.anchor.setTo(0.5, 0.5);
        game.add.tween(logo).to({ y: height/2 - 20 }, 1000, Phaser.Easing.Bounce.Out).start(); // Creates bounce in effect of menu

        var label = game.add.text(width/2, height - 60, 'Press the UP arrow key to start', { font: '24px Arial', fill: '#ffff' });
        label.anchor.setTo(0.5, 0.5);
        game.add.tween(label).to({y: height - 70}, 500).to({y: height - 50}, 500).loop().start();
        // Play the game music
        gameMusic = this.game.add.audio('music', 1, true, true); // 3rd options set loop
        gameMusic.play();
	},

	update: function() {
        if (this.soundKey.isDown)
            gameMusic.pause();
		if (this.cursor.up.isDown)
			this.game.state.start('Play');
	},
};                                                                            