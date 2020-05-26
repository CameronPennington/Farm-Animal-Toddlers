var GameState = {
	preload: function () {
		this.load.image("background", "./assets/images/background.png");
		this.load.image("arrow", "./assets/images/arrow.png");
		this.load.image("chicken", "./assets/images/chicken.png");
		this.load.image("horse", "./assets/images/horse.png");
		this.load.image("pig", "./assets/images/pig.png");
		this.load.image("sheep", "./assets/images/sheep3.png");
	},
	create: function () {
		const { centerX, centerY } = this.game.world;
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

		this.scale.pageAlignHorizontally = true;
		this.scale.pageAlignVertically = true;

		this.background = this.game.add.sprite(0, 0, "background");

		var animalData = [
			{ key: "chicken", text: "CHICKEN" },
			{ key: "horse", text: "HORSE" },
			{ key: "pig", text: "PIG" },
			{ key: "sheep", text: "SHEEP" },
		];
		this.animals = this.game.add.group();

		animalData.forEach((element) => {
			let animal = this.animals.create(-1000, centerY, element.key, 0);
			animal.customParams = { text: element.text };
			animal.anchor.setTo(0.5);
			animal.inputEnabled = true;
			animal.input.pixelPerfectClick = true;
			animal.events.onInputDown.add(this.animateAnimal, this);
		});

		this.currentAnimal = this.animals.next();
		this.currentAnimal.position.set(centerX, centerY);

		this.rightArrow = this.game.add.sprite(580, centerY, "arrow");
		this.rightArrow.anchor.setTo(0.5);
		this.rightArrow.customParams = { direction: 1 };

		this.rightArrow.inputEnabled = true;
		this.rightArrow.input.pixelPerfectClick = true;
		this.rightArrow.events.onInputDown.add(this.switchAnimal, this);

		this.leftArrow = this.game.add.sprite(60, centerY, "arrow");
		this.leftArrow.anchor.setTo(0.5);
		this.leftArrow.scale.x = -1;
		this.leftArrow.customParams = { direction: -1 };

		this.leftArrow.inputEnabled = true;
		this.leftArrow.input.pixelPerfectClick = true;
		this.leftArrow.events.onInputDown.add(this.switchAnimal, this);
	},
	update: function () {},
	switchAnimal: function (sprite, event) {
		const { centerX, centerY } = this.game.world;
		let newAnimal;
		let endX;

		if (sprite.customParams.direction > 0) {
			newAnimal = this.animals.next();
			newAnimal.x = newAnimal.width / 2;
			endX = 640 + this.currentAnimal.width / 2;
		} else {
			newAnimal = this.animals.previous();
			newAnimal.x = 640 + newAnimal.width / 2;
			endX = -this.currentAnimal.width / 2;
		}

		var newAnimalMovement = this.game.add.tween(newAnimal);
		newAnimalMovement.to({ x: centerX }, 1000);
		newAnimalMovement.start();

		var currentAnimalMovement = this.game.add.tween(this.currentAnimal);
		currentAnimalMovement.to({ x: endX }, 1000);
		currentAnimalMovement.start();

		this.currentAnimal.x = endX;
		newAnimal.x = centerX;
		this.currentAnimal = newAnimal;
	},
	animateAnimal: function (sprite, event) {
		console.log("animate animal");
	},
};
var game = new Phaser.Game(640, 320, Phaser.AUTO);

game.state.add("GameState", GameState);

game.state.start("GameState");
