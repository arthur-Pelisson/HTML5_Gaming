var cameras;
var map;
var player;
var platforms;
var cursors;
var wall_world;
var bgtile;
var skeleton;
var skeleton2;
var skeleton3;
var skeleton4;
var reddragon;
var fire;
var flag;
var name;
var score;
var health;
var scoreText3;
var healthText3;
var block;
var withblock;
var musics;
// ajouter score, vie
class Scene3 extends Phaser.Scene {
  constructor() {
    super({ key: "scene3" });
  }
  init(data) {
    name = data.name;
    score = data.score;
    health = data.health;
    musics = data.music;
  }
  preload() {
    this.load.image("cyberpunk", "assets/scenes/scene3/cyberpunk-test.png");
    this.load.image("ground-street", "assets/scenes/scene3/rock.jpg");
    this.load.spritesheet(
      "skeleton_walk",
      "assets/scenes/scene3/Skeleton_Walk.png",
      {
        frameWidth: 41.36,
        frameHeight: 60
      }
    );
    this.load.spritesheet(
      "drak_idle",
      "assets/scenes/scene3/reddragonfly3.png",
      {
        frameWidth: 400,
        frameHeight: 300
      }
    );
    this.load.spritesheet("fire", "assets/scenes/scene3/fire.png", {
      frameWidth: 100,
      frameHeight: 100
    });
    this.load.image("diamond", "assets/scenes/scene3/diamond.png");
    this.load.image("wall_world", "assets/scenes/scene3/wall_world.jpg");
    this.load.image("stone_wall", "assets/scenes/scene3/stone_wall01.png");
    this.load.image("flag", "assets/scenes/scene3/flagRed2.png");
  }
  create() {
    this.add.image(0, 200, "cyberpunk");
    this.add.image(1800, 200, "cyberpunk");
    block = this.physics.add.staticGroup();
    platforms = this.physics.add.staticGroup();
    wall_world = this.physics.add.staticGroup();
    this.draw_block(10, 300, 470);
    this.draw_block(9, 610, 350);
    this.draw_block(6, 900, 220);
    this.draw_block(5, 1100, 470);
    this.draw_block(5, 1350, 470);
    this.draw_block(2, 1500, 470);
    this.draw_block(5, 1550, 350);
    platforms
      .create(80, 600, "ground-street")
      .setScale(1)
      .refreshBody();
    platforms
      .create(1800, 600, "ground-street")
      .setScale(1)
      .refreshBody();

    //wall border world
    wall_world
      .create(-10, 200, "wall_world")
      .setScale(1)
      .refreshBody();
    wall_world
      .create(2600, 200, "wall_world")
      .setScale(1)
      .refreshBody();

    player = this.physics.add.sprite(100, 535, name, 0);
    skeleton = this.physics.add.sprite(400, 545, "skeleton_walk");
    skeleton2 = this.physics.add.sprite(400, 425, "skeleton_walk");
    skeleton3 = this.physics.add.sprite(1350, 425, "skeleton_walk");
    skeleton4 = this.physics.add.sprite(1000, 545, "skeleton_walk");
    reddragon = this.physics.add.sprite(2300, 200, "drak_idle");

    fire = this.physics.add.sprite(2130, 290, "fire");
    //player
    this.physics.add.collider(player, [wall_world, platforms, block]);

    //skeleton1
    this.physics.add.collider(skeleton, [wall_world, platforms]);

    //skeleton2
    this.physics.add.collider(skeleton2, [wall_world, platforms, block]);

    //skeleton3
    this.physics.add.collider(skeleton3, [wall_world, platforms, block]);

    //skeleton4
    this.physics.add.collider(skeleton4, [wall_world, platforms, block]);

    //drak
    this.physics.add.collider(reddragon, [wall_world, platforms, block]);

    this.physics.add.collider(fire, [wall_world, platforms, block]);
    player.setBounce(0.2);
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
      key: "skeletonwalk",
      frames: this.anims.generateFrameNumbers("skeleton_walk", {
        start: 2,
        end: 10
      }),
      frameRate: 20,
      repeat: -1
    });

    this.anims.create({
      key: "drakfly",
      frames: this.anims.generateFrameNumbers("drak_idle", {
        start: 9,
        end: 15
      }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "fire",
      frames: this.anims.generateFrameNumbers("fire", { start: 1, end: 15 }),
      frameRate: 10,
      repeat: -1
    });
    cursors = this.input.keyboard.createCursorKeys();
    this.cameras.main.setSize(900, 950);
    this.cameras.main.setBounds(0, 0, 2600, 600);

    skeleton.setCollideWorldBounds(true);
    skeleton2.setCollideWorldBounds(true);

    this.tweens.timeline({
      targets: skeleton.body.velocity,
      loop: -1,
      tweens: [
        { x: 200, y: 0, duration: 3000, ease: "Stepped", flipX: true },
        { x: -200, y: 0, duration: 3000, ease: "Stepped", flipX: true }
      ]
    });

    this.tweens.timeline({
      targets: skeleton2.body.velocity,
      loop: -1,
      tweens: [
        { x: 100, y: 0, duration: 2000, ease: "Stepped" },
        { x: -100, y: 0, duration: 2000, ease: "Stepped" }
      ]
    });

    this.tweens.timeline({
      targets: skeleton3.body.velocity,
      loop: -1,
      tweens: [
        { x: 100, y: 0, duration: 2000, ease: "Stepped" },
        { x: -100, y: 0, duration: 2000, ease: "Stepped" }
      ]
    });

    this.tweens.timeline({
      targets: skeleton4.body.velocity,
      loop: -1,
      tweens: [
        { x: 100, y: 0, duration: 2000, ease: "Stepped" },
        { x: -100, y: 0, duration: 2000, ease: "Stepped" }
      ]
    });

    this.tweens.timeline({
      targets: reddragon.body.velocity,
      loop: -1,
      tweens: [
        {
          x: 0,
          y: 200,
          duration: 2000,
          ease: "Stepped",
          onRepeat: function() {
            console.log(coucou);
          }
        },
        { x: -0, y: -200, duration: 2000, ease: "Stepped" }
      ]
    });

    this.tweens.timeline({
      targets: reddragon.body.velocity,
      loop: -1,
      tweens: [
        { x: 0, y: 200, duration: 2000, ease: "Stepped" },
        { x: -0, y: -200, duration: 2000, ease: "Stepped" }
      ]
    });

    this.tweens.timeline({
      targets: fire.body.velocity,
      loop: -1,
      tweens: [
        { x: 0, y: 200, duration: 2000, ease: "Stepped" },
        { x: -0, y: -200, duration: 2000, ease: "Stepped" }
      ]
    });

    var flag = this.physics.add.group({
      key: "flag",
      repeat: 1,
      setXY: {
        x: 2580,
        y: 445
      }
    });
    flag.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });
    this.physics.add.collider(flag, [platforms]);
    var diamonds = this.physics.add.group({
      key: "diamond",
      repeat: 13,
      setXY: {
        x: 100,
        y: 0,
        stepX: 200
      }
    });
    diamonds.children.iterate(function(child) {
      child.setBounceY(Phaser.Math.FloatBetween(0.2, 0.5));
    });
    this.physics.add.collider(diamonds, [platforms, block]);

    this.physics.add.overlap(
      player,
      diamonds,
      this.collectDiamonds,
      null,
      this
    );
    // TEXTES
    scoreText3 = this.add.text(16, 40, "Score: " + score, {
      fontsize: "32px",
      fill: "#FFFFFF",
      align: "center"
    });
    scoreText3.setScrollFactor(0);
    healthText3 = this.add.text(750, 40, health + " Vies", {
      fontSize: "22px",
      fill: "#FFFFFF",
      align: "center"
    });
    healthText3.setScrollFactor(0);

    this.add.text(100, 100, " 'Skeleton's are already dead u dumb'", {
      fontSize: "32px",
      fill: "#FFFFFF",
      align: "center"
    });
    this.physics.add.collider(player, skeleton, this.hit_skeleton, null, this);
    this.physics.add.collider(player, skeleton2, this.hit_skeleton, null, this);
    this.physics.add.collider(player, skeleton3, this.hit_skeleton, null, this);
    this.physics.add.collider(player, skeleton4, this.hit_skeleton, null, this);
    this.physics.add.collider(player, reddragon, this.hit_skeleton, null, this);

    this.physics.add.collider(player, flag, this.win, null, this);
    skeleton.anims.play("skeletonwalk", true);
    skeleton2.anims.play("skeletonwalk", true);
    skeleton3.anims.play("skeletonwalk", true);
    skeleton4.anims.play("skeletonwalk", true);
    reddragon.anims.play("drakfly", true);
    fire.anims.play("fire", true);
  }
  update() {
    this.cameras.main.startFollow(player);

    if (cursors.left.isDown) {
      player.setVelocityX(-300);
      player.anims.play("left", true);
      player.flipX = true;
    } else if (cursors.right.isDown) {
      player.setVelocityX(350);
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
  hit_skeleton(player, skeleton) {
    player.setTint(0xff0000);
    setTimeout(() => {
      this.physics.pause();
      health -= 1;
      if (health !== 0) {
        setTimeout(() => {
          this.scene.start("scene3", {
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
    // gameOver = true;
  }
  draw_block(nb, withblock, heightblock) {
    for (var x = 0; x < nb; x++) {
      block
        .create(withblock, heightblock, "stone_wall")
        .setScale(1)
        .refreshBody();
      withblock += 31;
    }
  }
  collectDiamonds(player, diamonds) {
    diamonds.disableBody(true, true);
    score += 10;
    scoreText3.setText("Score: " + score);
  }
  win(player) {
    player.anims.play("idle");
    this.physics.pause();
    this.cameras.main.flash(80);
    setTimeout(() => {
      this.scene.start("scene5", {
        name: name,
        score: score,
        health: health,
        music: musics
      });
    }, 1000);
  }
}
export default Scene3;
