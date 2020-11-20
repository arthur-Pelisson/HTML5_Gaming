var name;
var score;
var health;
var player;
var ground_2;
var wall_sand;
var wall_sand2;
var cursors;
var scoreText2;
var healthText2;
var diamonds;
var yellow_bird;
var blue_bird;
var boss_bird;
var boss_bird_health;
var bonus;
var musics;
// add ennemis, add boss
class Scene2 extends Phaser.Scene {
  constructor() {
    super({ key: "scene2" });
  }
  init(data) {
    name = data.name;
    score = data.score;
    health = data.health;
    musics = data.music;
  }
  preload() {
    this.load.image("map_sand", "assets/scenes/scene2/map_sand.png");
    this.load.image("ground2", "assets/scenes/scene2/ground_sand.png");
    this.load.image("wall_sand", "assets/scenes/scene2/wall_2.png");
    this.load.image("diamond", "assets/scenes/diamond.png");
    this.load.image(
      "short_sand_plateform",
      "assets/scenes/scene2/short_plateform_sand.png"
    );
    this.load.image(
      "long_sand_plateform",
      "assets/scenes/scene2/long_plateform_sand.png"
    );
    this.load.spritesheet(
      "yellow_bird",
      "assets/scenes/scene2/yellow_bird.png",
      {
        frameWidth: 146,
        frameHeight: 100
      }
    );
    this.load.spritesheet("blue_bird", "assets/scenes/scene2/blue_bird.png", {
      frameWidth: 139,
      frameHeight: 100
    });
    this.load.spritesheet("boss_bird", "assets/scenes/scene2/bird_boss.png", {
      frameWidth: 233,
      frameHeight: 160
    });
  }
  create() {
    //ENNEMIES AND PLAYER
    boss_bird_health = 3;

    this.physics.resume();
    this.add.image(600, 300, "map_sand");
    player = this.physics.add.sprite(100, 400, name, 0);
    player.setBounce(0.2);
    yellow_bird = this.physics.add.sprite(740, 100, "yellow_bird", 0);
    yellow_bird.setVelocityX(-80);
    blue_bird = this.physics.add.sprite(1500, 100, "blue_bird", 0);
    blue_bird.setVelocityX(Phaser.Math.FloatBetween(-200, -150));
    boss_bird = this.physics.add.sprite(2100, 100, "boss_bird", 0);
    boss_bird.setVelocityX(-200);

    // WALL AND PLATEFORMS
    ground_2 = this.physics.add.staticGroup({
      key: "ground2",
      repeat: 40,
      setXY: {
        x: 0,
        y: 600,
        stepX: 70
      }
    });
    wall_sand = this.physics.add.staticGroup({
      key: "wall_sand",
      repeat: 40,
      setXY: {
        x: 0,
        y: 400
      }
    });
    wall_sand2 = this.physics.add.staticGroup({
      key: "wall_sand",
      setXY: {
        x: 2420,
        y: 450
      }
    });

    var diamonds = this.physics.add.group({
      key: "diamond",
      repeat: 16,
      setXY: {
        x: 300,
        y: 0,
        stepX: 200
      }
    });
    diamonds.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });

    // PLATEFORMS
    var plateform1 = this.physics.add.staticGroup({
      key: "short_sand_plateform",
      setXY: {
        x: 300,
        y: 400
      }
    });
    var plateform2 = this.physics.add.staticGroup({
      key: "long_sand_plateform",
      setXY: {
        x: 500,
        y: 500
      }
    });
    var plateform3 = this.physics.add.staticGroup({
      key: "long_sand_plateform",
      setXY: {
        x: 800,
        y: 400
      }
    });
    var plateform4 = this.physics.add.staticGroup({
      key: "long_sand_plateform",
      setXY: {
        x: 1100,
        y: 300
      }
    });
    var plateform5 = this.physics.add.staticGroup({
      key: "short_sand_plateform",
      setXY: {
        x: 1670,
        y: 460
      }
    });
    var plateform6 = this.physics.add.staticGroup({
      key: "short_sand_plateform",
      setXY: {
        x: 2300,
        y: 460
      }
    });
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
      key: "blue_fly",
      frames: this.anims.generateFrameNumbers("blue_bird", {
        start: 0,
        end: 3
      }),
      frameRate: 10,
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
      key: "yellow_fly",
      frames: this.anims.generateFrameNumbers("yellow_bird", {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: "boss_fly",
      frames: this.anims.generateFrameNumbers("boss_bird", {
        start: 0,
        end: 4
      }),
      frameRate: 20,
      repeat: -1
    });
    //TEXT
    scoreText2 = this.add.text(16, 40, "Score: " + score, {
      fontsize: "32px",
      fill: "#FFFFFF",
      align: "center"
    });
    scoreText2.setScrollFactor(0);

    healthText2 = this.add.text(750, 40, health + " Vies", {
      fontSize: "22px",
      fill: "#FFFFFF",
      align: "center"
    });
    healthText2.setScrollFactor(0);

    var TipsText = this.add.text(200, 40, " 'All birds die one day '", {
      fontSize: "32px",
      fill: "#FFFFFF",
      align: "center"
    });
    //play anims
    yellow_bird.flipX = true;
    yellow_bird.anims.play("yellow_fly", true);
    blue_bird.flipX = true;
    blue_bird.anims.play("blue_fly", true);
    boss_bird.flipX = true;
    boss_bird.anims.play("boss_fly", true);
    //Collision
    this.physics.add.collider(player, [
      ground_2,
      wall_sand,
      wall_sand2,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      plateform5,
      plateform6
    ]);
    this.physics.add.collider(diamonds, [
      ground_2,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      plateform5,
      plateform6
    ]);
    this.physics.add.collider(yellow_bird, [
      ground_2,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      plateform5,
      plateform6
    ]);
    this.physics.add.collider(blue_bird, [
      ground_2,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      plateform5,
      plateform6
    ]);
    this.physics.add.collider(boss_bird, [
      ground_2,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      plateform5,
      plateform6
    ]);
    this.physics.add.collider(player, yellow_bird, this.Combat, null, this);
    this.physics.add.collider(player, blue_bird, this.CombatBlue, null, this);
    this.physics.add.collider(player, boss_bird, this.CombatBoss, null, this);

    this.physics.add.overlap(
      player,
      diamonds,
      this.collectDiamonds,
      null,
      this
    );
    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setSize(900, 1000);
    this.cameras.main.setBounds(0, 0, 2400);
    this.cameras.main.startFollow(player);
  }
  update() {
    //BIRDS
    if (yellow_bird.body.touching.left) {
      yellow_bird.setVelocityY(-600);
      yellow_bird.flipX = false;
      yellow_bird.setVelocityX(80);
    }
    if (yellow_bird.body.touching.right) {
      yellow_bird.setVelocityY(-600);
      yellow_bird.flipX = true;
      yellow_bird.setVelocityX(-80);
    }
    if (blue_bird.body.touching.left) {
      blue_bird.setVelocityY(Phaser.Math.Between(-600, -300));
      blue_bird.flipX = false;
      blue_bird.setVelocityX(Phaser.Math.Between(150, 200));
    }
    if (blue_bird.body.touching.right) {
      blue_bird.setVelocityY(Phaser.Math.Between(-550, -300));
      blue_bird.flipX = true;
      blue_bird.setVelocityX(Phaser.Math.Between(-200, -150));
    }

    //BOSS
    if (boss_bird.body.touching.left) {
      boss_bird.flipX = false;
      boss_bird.setVelocityX(200);
      if (boss_bird_health === 3) {
        boss_bird.setVelocityX(200);
      } else if (boss_bird_health === 2) {
        boss_bird.setVelocityX(400);
      } else if (boss_bird_health === 1) {
        boss_bird.setVelocityX(600);
      }
    }

    if (boss_bird.body.touching.right) {
      boss_bird.flipX = true;
      boss_bird.setVelocityX(-200);
      if (boss_bird_health === 3) {
        boss_bird.setVelocityX(-200);
      } else if (boss_bird_health === 2) {
        boss_bird.setVelocityX(-400);
      } else if (boss_bird_health === 1) {
        boss_bird.setVelocityX(-600);
      }
    }

    if (cursors.left.isDown) {
      player.setVelocityX(-195);
      player.anims.play("left", true);
      player.flipX = true;
    } else if (cursors.right.isDown) {
      player.setVelocityX(200);
      player.anims.play("right", true);
      player.flipX = false;
    } else if (cursors.up.isDown) {
      player.anims.play("up", true);
    } else {
      player.setVelocityX(0);
      player.anims.play("idle", true);
    }
    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-400);
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

  // MES FUNCTIONS

  collectDiamonds(player, diamonds) {
    diamonds.disableBody(true, true);
    score += 10;
    scoreText2.setText("Score: " + score);
  }
  CombatBoss() {
    if (player.body.touching.down && boss_bird.body.touching.up) {
      boss_bird_health -= 1;
      player.setVelocityY(-500);
      if (boss_bird_health === 0) {
        this.cameras.main.flash(80);
        setTimeout(() => {
          this.scene.start("scene3", {
            name: name,
            score: score,
            health: health,
            music: musics
          });
        }, 2000);
      }
    } else {
      player.setTint(0xff0000);
      setTimeout(() => {
        this.physics.pause();
        health -= 1;
        if (health !== 0) {
          setTimeout(() => {
            this.scene.start("scene2", {
              name: name,
              score: score,
              health: health,
              music: musics
            });
          }, 1000);
        } else {
          setTimeout(() => {
            this.scene.start("Menu", { name: name, score: 0, health: health });
            location.reload();
          }, 1000);
        }
      });
    }
  }
  Combat() {
    if (player.body.touching.down && yellow_bird.body.touching.up) {
      player.setVelocityY(-100);
      yellow_bird.setTint(0xff0000);
      yellow_bird.disableBody(true, true);
      score += 20;
      scoreText2.setText("Score " + score);
    } else {
      player.setTint(0xff0000);
      setTimeout(() => {
        this.physics.pause();
        health -= 1;
        if (health !== 0) {
          setTimeout(() => {
            this.scene.start("scene2", {
              name: name,
              score: score,
              health: health,
              music: musics
            });
          }, 1000);
        } else {
          setTimeout(() => {
            this.scene.start("Menu", { name: name, score: 0, health: health });
            location.reload();
          }, 1000);
        }
      });
    }
  }
  CombatBlue() {
    if (player.body.touching.down && blue_bird.body.touching.up) {
      player.setVelocityY(-100);
      blue_bird.setTint(0xff0000);
      blue_bird.disableBody(true, true);
      score += 20;
      scoreText2.setText("Score " + score);
    } else {
      player.setTint(0xff0000);
      setTimeout(() => {
        this.physics.pause();
        health -= 1;
        if (health !== 0) {
          setTimeout(() => {
            this.scene.start("scene2", {
              name: name,
              score: score,
              health: health
            });
          }, 1000);
        } else {
          setTimeout(() => {
            this.scene.start("Menu", { name: name, score: 0, health: health });
            location.reload();
          }, 1000);
        }
      });
    }
  }
}
export default Scene2;
