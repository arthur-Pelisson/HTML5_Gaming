//----> TO DO
/*

  + Animation Die
  + voir si no bug scene 2
  + BUG : Boss disparait au contact du die
  + 

*/
////////------->

import Menu from "../Menu";

var player;
var cursors;
var cameras;
var name;
var score;
var health;
var scoreText;
var healthText;
var canard;
var canard1;
var canard2;
var boss;
var endflag;
var musics;
class Scene1 extends Phaser.Scene {
  constructor() {
    super({ key: "scene1" });
  }
  init(data) {
    name = data.name;
    score = data.score;
    health = data.health;
    musics = data.music;
  }
  preload() {
    this.load.image("map", "assets/menu/background-menu.png");
    this.load.image("endflag", "assets/scenes/endflag.png");
    this.load.image("star", "assets/scenes/star.png");
    this.load.image("diamond", "assets/scenes/diamond.png");
    this.load.image("plateform_grass", "assets/scenes/grasshalf.png");
    this.load.image("long_plateform_grass", "assets/scenes/plateforme1.png");
    this.load.image("ground", "assets/scenes/ground1.png");
    this.load.image("horizontal-ground", "assets/scenes/horizontal-ground.png");
    this.load.spritesheet("canard", "assets/scenes/canard_sheet.png", {
      frameWidth: 64,
      frameHeight: 64
    });
    this.load.spritesheet(name, "assets/scenes/" + name + ".png", {
      frameWidth: 55,
      frameHeight: 80
    });
    this.load.spritesheet("boss", "assets/scenes/boss_1_walking.png", {
      frameWidth: 300,
      frameHeight: 170
    });
  }
  create() {
    this.add.image(100, 400, "map");
    endflag = this.add.image(1300, 600, "endflag");
    endflag.setTint(0xfd6a02);
    endflag.setScale(0.5);
    // PLAYERS AND ENNEMIS
    player = this.physics.add.sprite(300, 400, name, 8);
    player.setBounce(0.2);
    boss = this.physics.add.sprite(2650, 0, "boss", 1);
    canard = this.physics.add.sprite(450, 400, "canard", 0);
    canard.setVelocityX(-40);
    canard1 = this.physics.add.sprite(800, 370, "canard", 0);
    canard1.setVelocityX(-40);
    canard2 = this.physics.add.sprite(1200, 400, "canard", 0);
    canard2.setVelocityX(-100);
    canard2.setTint(0xd3ffce);
    canard.setCollideWorldBounds(true);
    // Decor's element
    var ground = this.physics.add.staticGroup({
      key: "ground",
      repeat: 39.5,
      setXY: {
        x: 0,
        y: 630,
        stepX: 70
      }
    });

    var wall1 = this.physics.add.staticGroup({
      key: "horizontal-ground",
      setXY: {
        x: 10,
        y: 500,
        setY: 120
      }
    });
    this.add.text(2250, 350, "<- RUN", {
      fontSize: "100px",
      fill: "#000",
      align: "center"
    });
    var wall2 = this.physics.add.staticGroup({
      key: "horizontal-ground",
      setXY: {
        x: 2800,
        y: 500,
        setY: 120
      }
    });
    var star = this.physics.add.staticGroup({
      key: "star",
      setXY: {
        x: 1500,
        y: 400
      }
    });
    // Plateforms
    var plateform1 = this.physics.add.staticGroup({
      key: "plateform_grass",
      repeat: 2,
      setXY: {
        x: 450,
        y: 510
      }
    });
    var plateform2 = this.physics.add.staticGroup({
      key: "plateform_grass",
      repeat: 15,
      setXY: {
        x: 550,
        y: 380
      }
    });
    var long_platform1 = this.physics.add.staticGroup({
      key: "long_plateform_grass",
      setXY: {
        x: 880,
        y: 440
      }
    });
    var plateform3 = this.physics.add.staticGroup({
      key: "plateform_grass",
      setXY: {
        x: 1200,
        y: 510
      }
    });
    var plateform4 = this.physics.add.staticGroup({
      key: "plateform_grass",
      setXY: {
        x: 1300,
        y: 430
      }
    });

    //Diamonds
    var diamonds = this.physics.add.group({
      key: "diamond",
      repeat: 13,
      setXY: {
        x: 100,
        y: 0,
        stepX: 200
      }
    });

    diamonds.children.iterate(function (child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });

    // COLLISION
    this.physics.add.collider(player, [
      ground,
      wall1,
      wall2,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      long_platform1
    ]);
    this.physics.add.collider(diamonds, [
      ground,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      long_platform1
    ]);
    this.physics.add.collider(boss, [
      ground,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      long_platform1
    ]);
    this.physics.add.collider(canard, [
      ground,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      long_platform1,
      wall1,
      wall2
    ]);
    this.physics.add.collider(canard1, [
      ground,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      long_platform1,
      wall1,
      wall2
    ]);
    this.physics.add.collider(canard2, [
      ground,
      plateform1,
      plateform2,
      plateform3,
      plateform4,
      long_platform1
    ]);
    this.physics.add.collider(player, canard, this.Combat, null, this);
    this.physics.add.collider(player, canard1, this.Combat, null, this);
    this.physics.add.collider(player, canard2, this.Combat, null, this);
    this.physics.add.collider(player, boss, this.CombatBoss, null, this);
    this.physics.add.overlap(
      player,
      diamonds,
      this.collectDiamonds,
      null,
      this
    );
    this.physics.add.overlap(player, star, this.ImaBeast, null, this);
    // DEFINE ANIMS
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
      key: "canard_walk",
      frames: this.anims.generateFrameNumbers("canard", {
        start: 0,
        end: 5
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
      key: "die",
      frames: this.anims.generateFrameNumbers(name, {
        start: 24,
        end: 26
      }),
      frameRate: 6,
      repeat: -1
    });
    this.anims.create({
      key: "boss_walk",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 0,
        end: 9
      }),
      frameRate: 8,
      repeat: -1
    });
    // DEFINE ATTACK DEPENDS ON CHOSEN CHARACTER

    if (name === "Tux") {
      // do shit
    } else if (name === "Kisi") {
      // do shit again
    } else {
      // always do shit
    }

    // INIT SCORE TEXT
    scoreText = this.add.text(16, 40, "Score: 0", {
      fontSize: "32px",
      fill: "#000",
      align: "center"
    });
    scoreText.setScrollFactor(0);
    // INIT HEALTH TEXT
    healthText = this.add.text(750, 40, health + " Vies", {
      fontSize: "32px",
      fill: "#000",
      align: "center"
    });
    healthText.setScrollFactor(0);
    // CURSORS AND CAMERAS
    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setSize(900, 920);
    cameras = this.cameras.main.startFollow(player);
    this.cameras.main.setBounds(0, 100, 2800);
  }
  update() {
    //CAMERAS
    if (player.body.x > 2100) {
      //RUUUUUUN
      this.EndScene();
    }
    // WINNING CONDITION
    if (player.body.x < 1260 && boss.body.touching.left) {
      this.physics.pause();
      cameras.flash(80);
      setTimeout(() => {
        this.scene.start("scene2", {
          name: name,
          score: score,
          health: health,
          music: musics
        });
      }, 2000);
    }
    //ENNEMIS
    canard.anims.play("canard_walk", true);
    canard1.anims.play("canard_walk", true);
    canard2.anims.play("canard_walk", true);

    // ENNEMIS MOVES
    if (canard.body.touching.left === true) {
      canard.setVelocityX(40);
      canard.flipX = true;
    }
    if (canard.body.touching.right === true) {
      canard.setVelocityX(-40);
      canard.flipX = false;
    }
    if (canard1.body.touching.left === true) {
      canard1.setVelocityX(40);
      canard1.flipX = true;
    }
    if (canard1.body.touching.right === true) {
      canard1.setVelocityX(-40);
      canard1.flipX = false;
    }
    if (canard1.body.touching.left === true) {
      canard1.setVelocityX(40);
      canard1.flipX = true;
    }
    if (canard1.body.touching.right === true) {
      canard1.setVelocityX(-40);
      canard1.flipX = false;
    }
    if (canard2.body.touching.left === true) {
      canard2.setVelocityX(100);
      canard2.flipX = true;
    }
    if (canard2.body.touching.right === true) {
      canard2.setVelocityX(-100);
      canard2.flipX = false;
    }

    //PLAYER
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

  collectDiamonds(player, diamonds) {
    diamonds.disableBody(true, true);
    score += 10;
    scoreText.setText("Score: " + score);
  }
  //RECU DE LETOILE
  ImaBeast(player, star) {
    star.disableBody(true, true);
    player.setTint(0xffd300);
    player.body.setBounce(0.8, 0.8);
  }
  EndScene() {
    boss.setVelocityX(-200);
    boss.anims.play("boss_walk", true);
    if (boss.body.touching.left) {
      boss.anims.play("boss_walk", true);
    }
    endflag.setY(530);
    //WINNING CONDITION
  }
  Combat(player, canard) {
    if (player.body.touching.down && canard.body.touching.up) {
      player.setVelocityY(-100);
      canard.setTint(0xff0000);
      canard.disableBody(true, true);
      score += 20;
      scoreText.setText("Score: " + score);
    } else {
      player.setTint(0xff0000);
      setTimeout(() => {
        this.physics.pause();
        health -= 1;
        if (health !== 0) {
          setTimeout(() => {
            this.scene.start("scene1", {
              name: name,
              score: 0,
              health: health,
              music: musics
            });
          }, 1000);
        } else {
          setTimeout(() => {
            this.scene.start("Menu", {
              name: name,
              score: 0,
              health: health,
              music: musics
            });
            location.reload();
          }, 1000);
        }
      });
    }
  }

  CombatBoss(player, cameras, boss) {
    player.anims.play("die", true);
    player.setTint(0xff0000);
    setTimeout(() => {
      this.physics.pause();
      health -= 1;
      if (health !== 0) {
        cameras.setSize(900, 920);
        cameras.setPosition(100, 0);
        setTimeout(() => {
          this.scene.start("scene1", { name: name, score: 0, health: health });
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
export default Scene1;
