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
var scoreText5;
var healthText5;
var musics;
var score;
var name;
var musics;
var health;
var body;

class Scene5 extends Phaser.Scene {
  constructor() {
    super({ key: "scene5" });
  }
  init(data) {
    name = data.name;
    score = data.score;
    health = data.health;
    musics = data.music;
  }
  preload() {
    this.load.spritesheet(name, "assets/scenes/" + name + ".png", {
      frameWidth: 55,
      frameHeight: 80
    });
    this.load.spritesheet(
      "big_monster",
      "assets/scenes/scene5/big_monster.png",
      {
        frameWidth: 200,
        frameHeight: 200
      }
    );
    this.load.image(
      "background_5",
      "assets/scenes/scene5/game_background_4.png"
    );
    this.load.image("key", "assets/scenes/scene5/keyYellow.png");
    this.load.image("texture", "assets/scenes/scene5/snow_plat.png");
    this.load.image("snow_end", "assets/scenes/scene5/snow_end.png");
    this.load.image("diamond", "assets/scenes/scene5/diamond.png");
    this.load.image("wall_world", "assets/scenes/scene5/wall_world.jpg");
    this.load.image("ground5", "assets/scenes/scene5/snowHalf_mid.png");
    this.load.image("flag", "assets/scenes/scene5/flagRed2.png");

    this.load.image("monster_ice", "assets/scenes/scene5/monster_ice.png");
  }
  create() {
    this.add.image(960, 200, "background_5");
    this.add.image(2600, 200, "background_5");
    scoreText5 = this.add.text(16, 40, "Score: 0", {
      fontSize: "32px",
      fill: "#FFFFFF",
      align: "center"
    });
    scoreText5.setScrollFactor(0);
    healthText5 = this.add.text(750, 40, health + " Vies", {
      fontSize: "32px",
      fill: "#FFFFFF",
      align: "center"
    });
    healthText5.setScrollFactor(0);
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

    player = this.physics.add.sprite(100, 300, name, 0);

    key = this.physics.add.image(2005, 450, "key").setImmovable(false);
    key.body.setAllowGravity(false);
    key.flipX = true;
    big_monster = this.physics.add.sprite(1900, 400, "big_monster", 0);
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
      key: "ground5",
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
      frames: this.anims.generateFrameNumbers(name, {
        start: 9,
        end: 11
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "up",
      frames: this.anims.generateFrameNumbers(name, {
        start: 20,
        end: 23
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers(name, {
        start: 0,
        end: 2
      }),
      frameRate: 6,
      repeat: -1
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers(name, {
        start: 0,
        end: 5
      }),
      frameRate: 20,
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

    this.physics.add.overlap(
      player,
      diamonds,
      this.collectDiamonds,
      null,
      this
    );

    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setSize(900, 950);
    this.cameras.main.setBounds(0, 0, 2000, 600);

    this.physics.add.collider(
      player,
      monster_ice,
      this.hit_monster,
      null,
      this
    );
    this.physics.add.collider(
      player,
      monster_ice2,
      this.hit_monster,
      null,
      this
    );
    // this.physics.add.collider(player, big_monster, hit_monster, null, this);

    this.physics.add.overlap(big_monster, monster_ice, this.kill, null, this);
    this.physics.add.overlap(big_monster, monster_ice2, this.kill, null, this);
    this.physics.add.overlap(big_monster, texture1, this.kill, null, this);
    this.physics.add.overlap(big_monster, texture2, this.kill, null, this);
    this.physics.add.overlap(big_monster, texture3, this.kill, null, this);
    this.physics.add.overlap(big_monster, texture4, this.kill, null, this);

    this.physics.add.collider(
      big_monster,
      wall_world_left,
      this.right,
      null,
      this
    );
    this.physics.add.collider(
      big_monster,
      wall_world_right,
      this.left,
      null,
      this
    );

    this.physics.add.overlap(player, key, this.phase2, null, this);
    // this.add
  }
  update() {
    // console.log(player);
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
  }
  render() {
    /*
    _____
    *                    __/_ ///
    *                   / _/    \
    *                   \/_\=[o=o]
    *                    \_,    __)
    *                     |     _\
    *                     l______/
    *                    /     :|
    *                   /  \   ;|-
    *                   \_______j
    *                   ./.....\..
         */
  }
  hit_monster(player, monster) {
    player.setTint(0xff0000);
    setTimeout(() => {
      this.physics.pause();
      health -= 1;
      if (health !== 0) {
        healthText5.setText(health + " Vies");
        setTimeout(() => {
          this.scene.start("scene5", {
            name: name,
            score: score,
            health: health,
            music: musics
          });
        }, 2000);
      } else {
        setTimeout(() => {
          this.scene.start("Menu", { name: name, score: 0, health: health });
          location.reload();
        }, 1000);
      }
    });
  }
  collectDiamonds(player, diamonds) {
    diamonds.disableBody(true, true);
    score += 10;
    scoreText5.setText("Score: " + score);
  }
  kill(whatever) {
    whatever.disableBody(true, true);
  }
  right(big_monster) {
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
  left(big_monster) {
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
  phase2(key) {
    nokey = 1;
    key.disableBody(true, true);
    big_monster.setTint(0xff0000);
    big_monster.flipX = true;
    secondPhase = 1;
    monster_ice.setVelocity(0);
    monster_ice2.setVelocity(0);
    big_monster.setVelocityX(400);
  }
}

export default Scene5;
