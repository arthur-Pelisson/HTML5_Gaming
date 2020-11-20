import "phaser";

var config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 900,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 600 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};
var cameras;
var player;
var platforms;
var cursors;
var wall_world_right;
var wall_world_left;
var wall_world2;
var snow_men;
var texture;
var monster_ice;
var monster_ice2;
var big_monster;
var boss = 1;
var key;
var secondPhase = 0;
var nokey = 0;

var game = new Phaser.Game(config);

function preload() {
  this.load.spritesheet("tux", "assets/Scenes/tux_from_linux.png", {
    frameWidth: 55,
    frameHeight: 80
  });

  this.load.spritesheet("big_monster", "assets/Scenes/big_monster.png", {
    frameWidth: 200,
    frameHeight: 200
  });

  this.load.image("background", "assets/Scenes/scene5/game_background_4.png");
  this.load.image("key", "assets/Scenes/scene5/keyYellow.png");
  this.load.image("texture", "assets/Scenes/scene5/snow_plat.png");
  this.load.image("snow_end", "assets/Scenes/scene5/snow_end.png");
  this.load.image("diamond", "assets/Scenes/scene5/diamond.png");
  this.load.image("wall_world", "assets/Scenes/scene5/wall_world.jpg");
  this.load.image("ground", "assets/Scenes/scene5/snowHalf_mid.png");
  this.load.image("flag", "assets/Scenes/scene5/flagRed2.png");

  this.load.image("monster_ice", "assets/Scenes/scene5/monster_ice.png");
}

function create() {
  this.add.image(960, 200, "background");
  this.add.image(2600, 200, "background");

  key = this.physics.add.staticGroup();
  wall_world_right = this.physics.add.staticGroup();
  wall_world_left = this.physics.add.staticGroup();
  wall_world2 = this.physics.add.staticGroup();

  wall_world_left
    .create(0, 200, "wall_world")
    .setScale(1)
    .refreshBody();
  wall_world_right
    .create(2010, 200, "wall_world")
    .setScale(1)
    .refreshBody();

  wall_world2
    .create(1500, 200, "wall_world")
    .setScale(1)
    .refreshBody();

  player = this.physics.add.sprite(100, 400, "tux", 8);

  key = this.physics.add.image(2005, 450, "key").setImmovable(false);
  key.body.setAllowGravity(false);
  key.flipX = true;
  big_monster = this.physics.add.sprite(1900, 400, "big_monster", 1);
  big_monster.depth = 999;

  player.setBounce(0.2);

  //var snow_end = this.physics.add.image(1200, 400, 'snow_end');

  monster_ice = this.physics.add.image(200, 500, "monster_ice");
  monster_ice.setVelocityX(900);

  monster_ice2 = this.physics.add.image(200, 500, "monster_ice");
  monster_ice2.setVelocityX(700);

  var texture1 = this.physics.add
    .image(180, 440, "texture")
    .setImmovable(false)
    .setVelocity(100, -100)
    .setGravityY(10000);
  texture1.body.setAllowGravity(false);

  var texture2 = this.physics.add
    .image(1000, 440, "texture")
    .setImmovable(true)
    .setVelocity(100, -100);
  texture2.body.setAllowGravity(false);

  var texture3 = this.physics.add
    .image(700, 440, "texture")
    .setImmovable(false)
    .setVelocity(100, -100);
  texture3.body.setAllowGravity(false);

  var texture4 = this.physics.add
    .image(400, 440, "texture")
    .setImmovable(true)
    .setVelocity(100, -100);
  texture4.body.setAllowGravity(false);

  var texture5 = this.physics.add
    .image(240, 320, "texture")
    .setImmovable(true)
    .setVelocity(300, -300);
  texture5.body.setAllowGravity(false);

  var texture7 = this.physics.add
    .image(810, 320, "texture")
    .setImmovable(true)
    .setVelocity(300, -300);
  texture7.body.setAllowGravity(false);

  var platforms = this.physics.add.staticGroup({
    key: "ground",
    repeat: 39.5,
    setXY: {
      x: 0,
      y: 600,
      stepX: 70
    }
  });

  this.physics.add.collider(player, [
    platforms,
    wall_world_right,
    wall_world_left,
    texture1,
    texture2,
    texture3,
    texture4,
    texture5,
    texture7
  ]);

  // this.physics.add.collider(snow_end, [
  // platforms,
  // wall_world,

  // ]);

  this.physics.add.collider(monster_ice, [
    platforms,
    wall_world_right,
    wall_world_left,
    wall_world2
  ]);

  this.physics.add.collider(monster_ice2, [
    platforms,
    wall_world_right,
    wall_world_left,
    wall_world2
  ]);

  this.physics.add.collider(big_monster, [platforms]);

  player.setCollideWorldBounds(false);
  monster_ice.setCollideWorldBounds(false);
  monster_ice.setCollideWorldBounds(false);
  big_monster.setCollideWorldBounds(false);

  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("tux", {
      start: 9,
      end: 11
    }),
    frameRate: 20,
    repeat: -1
  });
  this.anims.create({
    key: "up",
    frames: this.anims.generateFrameNumbers("tux", {
      start: 5,
      end: 6
    }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: "idle",
    frames: this.anims.generateFrameNumbers("tux", {
      start: 0,
      end: 2
    }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("tux", {
      start: 0,
      end: 5
    }),
    frameRate: 20,
    repeat: -1
  });
  this.anims.create({
    key: "die",
    frames: this.anims.generateFrameNumbers("tux", {
      start: 24,
      end: 26
    }),
    frameRate: 6,
    repeat: -1
  });

  this.anims.create({
    key: "monster_walk",
    frames: this.anims.generateFrameNumbers("big_monster", {
      start: 0,
      end: 4
    }),
    frameRate: 10,
    repeat: -1
  });

  this.tweens.timeline({
    targets: texture1.body.velocity,
    loop: -1,
    tweens: [
      { x: 100, y: 0, duration: 3000, ease: "Stepped" },
      { x: -100, y: 0, duration: 3000, ease: "Stepped" }
    ]
  });

  this.tweens.timeline({
    targets: texture2.body.velocity,
    loop: -1,
    tweens: [
      { x: 100, y: 0, duration: 3000, ease: "Stepped" },
      { x: -100, y: 0, duration: 3000, ease: "Stepped" }
    ]
  });
  this.tweens.timeline({
    targets: texture3.body.velocity,
    loop: -1,
    tweens: [
      { x: 100, y: 0, duration: 3000, ease: "Stepped" },
      { x: -100, y: 0, duration: 3000, ease: "Stepped" }
    ]
  });
  this.tweens.timeline({
    targets: texture4.body.velocity,
    loop: -1,
    tweens: [
      { x: 100, y: 0, duration: 3000, ease: "Stepped" },
      { x: -100, y: 0, duration: 3000, ease: "Stepped" }
    ]
  });

  this.tweens.timeline({
    targets: texture5.body.velocity,
    loop: -1,
    tweens: [
      { x: 50, y: 0, duration: 3000, ease: "Stepped" },
      { x: -50, y: 0, duration: 3000, ease: "Stepped" }
    ]
  });

  this.tweens.timeline({
    targets: texture7.body.velocity,
    loop: -1,
    tweens: [
      { x: 50, y: 0, duration: 3000, ease: "Stepped" },
      { x: -50, y: 0, duration: 3000, ease: "Stepped" }
    ]
  });

  var diamonds = this.physics.add.group({
    key: "diamond",
    repeat: 13,
    setXY: {
      x: 100,
      y: 0,
      stepX: 200
    }
  });

  this.physics.add.collider(diamonds, [
    platforms,
    texture1,
    texture2,
    texture3,
    texture4,
    texture5,
    texture7
  ]);

  this.physics.add.overlap(player, diamonds, collectDiamonds, null, this);

  cursors = this.input.keyboard.createCursorKeys();
  this.cameras.main.setSize(900, 950);
  this.cameras.main.setBounds(0, 0, 2000, 600);

  this.physics.add.collider(player, monster_ice, hit_monster, null, this);
  this.physics.add.collider(player, monster_ice2, hit_monster, null, this);
  // this.physics.add.collider(player, big_monster, hit_monster, null, this);

  this.physics.add.overlap(big_monster, monster_ice, kill, null, this);
  this.physics.add.overlap(big_monster, monster_ice2, kill, null, this);
  this.physics.add.overlap(big_monster, texture1, kill, null, this);
  this.physics.add.overlap(big_monster, texture2, kill, null, this);
  this.physics.add.overlap(big_monster, texture3, kill, null, this);
  this.physics.add.overlap(big_monster, texture4, kill, null, this);

  this.physics.add.collider(big_monster, wall_world_left, right, null, this);
  this.physics.add.collider(big_monster, wall_world_right, left, null, this);

  console.log(
    this.physics.add.collider(player, monster_ice, hit_monster, null, this)
  );

  this.physics.add.overlap(player, key, phase2, null, this);
}

function update() {
  this.cameras.main.startFollow(player);
  if (player.body.x > 1550 && boss === 1) {
    big_monster.setVelocityX(-130);
    key.setVelocityX(-130);
    big_monster.anims.play("monster_walk", true);
    boss = 0;
  }

  if (cursors.left.isDown) {
    if (secondPhase === 0) {
      player.setVelocityX(-300);
      player.anims.play("left", true);
      player.flipX = true;
    }
  } else if (cursors.right.isDown) {
    if (secondPhase === 0) {
      player.setVelocityX(350);
      player.anims.play("right", true);
      player.flipX = false;
    }
  } else {
    player.setVelocityX(0);
    player.anims.play("idle", true);
  }
  if (cursors.up.isDown && player.body.touching.down) {
    if (secondPhase === 0) {
      player.setVelocityY(-400);
      player.anims.play("up", true);
    }
  }

  // ENNEMIS MOVES
  if (monster_ice.body.touching.right === true) {
    monster_ice.setVelocityX(-900);
  }
  if (monster_ice.body.touching.left === true) {
    monster_ice.setVelocityX(900);
  }
  if (monster_ice2.body.touching.right === true) {
    monster_ice2.setVelocityX(-800);
  }
  if (monster_ice2.body.touching.left === true) {
    monster_ice2.setVelocityX(800);
  }
  // if (big_monster.body.touching.right === true) {
  // big_monster.setVelocityX(-130);
  // big_monster.flipX = false;

  // }
  // if (big_monster.body.touching.left === true) {
  // big_monster.setVelocityX(130);
  // big_monster.flipX = true;
  // }
}

function hit_monster(player, monster) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  // // gameOver = true;
}

function collectDiamonds(player, diamonds) {
  diamonds.disableBody(true, true);
  // score += 10;
  // scoreText.setText("Score: " + score);
}

function kill(big_monster, whatever) {
  whatever.disableBody(true, true);
}

function right(big_monster, wall_world_right) {
  if (secondPhase === 0) {
    var keyWidth = big_monster.body.x;

    big_monster.setVelocityX(130);
    if (nokey != 1) {
      key.disableBody(true, true);
      keyWidth = keyWidth - 5;
      key = this.physics.add.image(keyWidth, 450, "key").setImmovable(false);
      key.body.setAllowGravity(false);

      key.setVelocityX(130);
      key.flipX = false;
      key.depth = 10;
      this.physics.add.overlap(player, key, phase2, null, this);
    }
    big_monster.flipX = true;
  }
}

function left(big_monster, wall_world_left) {
  if (secondPhase === 0) {
    var keyWidth = big_monster.body.x;
    keyWidth = keyWidth + 200;
    big_monster.setVelocityX(-130);
    if (nokey != 1) {
      key.disableBody(true, true);
      key = this.physics.add.image(keyWidth, 450, "key").setImmovable(false);
      key.body.setAllowGravity(false);
      key.setVelocityX(-130);
      key.flipX = true;
      key.depth = 10;
      this.physics.add.overlap(player, key, phase2, null, this);
    }
    big_monster.flipX = false;
  }
}

function phase2(player, key) {
  nokey = 1;
  key.disableBody(true, true);
  big_monster.setTint(0xff0000);
  big_monster.flipX = true;
  secondPhase = 1;
  monster_ice2.setVelocity(0);
  monster_ice2.setVelocity(0);

  // this.physics.pause();

  big_monster.setVelocityX(400);
}
