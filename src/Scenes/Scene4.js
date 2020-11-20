var name;
var health;
var score;
var player;
var FinalMusic;
var animation;
var isOnHisWay;
var question_mark;
var EndBoss;
var LastTip;
var musics;
var ancientMusic;
var tumbleweed;
var rollAway;
var tumbleweed2;
var tumbleweed3;
var tumbleweed4;
var kamehameha;
var dead;
var deadBoss;
// PLOT _-> walk... then make animation kamehameha and kill first boss
//TODO : FIX MUSICS
class Scene4 extends Phaser.Scene {
  constructor() {
    super({ key: "scene4" });
  }
  init(data) {
    name = data.name;
    score = data.score;
    health = data.health;
    musics = data.music;
  }
  preload() {
    this.load.image(
      "background",
      "assets/scenes/scene4/backgroud_endscene.png"
    );
    this.load.spritesheet("Tumbleweed", "assets/scenes/scene4/tumbleweed.png", {
      frameWidth: 45,
      frameHeight: 100
    });
    this.load.image("question_mark", "assets/scenes/scene2/question_mark.png");
    this.load.image("ground", "assets/scenes/ground1.png");
    this.load.image("wall", "assets/scenes/horizontal-ground.png");
    this.load.audio("finalMusic", "assets/final_music.wav");
    this.load.audio("ancienMusic", "assets/game_music.wav");
    this.load.spritesheet("EndBoss", "assets/scenes/scene4/deadBoss.png", {
      frameWidth: 300,
      frameHeight: 170
    });
    this.load.spritesheet("DeadBoss", "assets/scenes/scene4/deadBoss2.png", {
      frameWidth: 328,
      frameHeight: 170
    });
  }
  create() {
    /*ancientMusic = this.sound.add("ancienMusic", {
      volume: 0.8,
      loop: true
    });
    ancientMusic.stop();*/

    FinalMusic = this.sound.add("finalMusic", {
      volume: 0.8,
      loop: true
    });
    FinalMusic.setMute(false);
    FinalMusic.play();
    this.add.image(0, 280, "background");
    tumbleweed = this.physics.add.sprite(1000, 400, "Tumbleweed", 0);
    tumbleweed2 = this.physics.add.sprite(2500, 400, "Tumbleweed", 0);
    tumbleweed3 = this.physics.add.sprite(1500, 400, "Tumbleweed", 0);
    tumbleweed4 = this.physics.add.sprite(2300, 400, "Tumbleweed", 0);
    question_mark = this.add.image(1900, 800, "question_mark");
    question_mark.setScale(0.2);
    player = this.physics.add.sprite(50, 300, name, 0);
    player.setBounce(0.2);
    EndBoss = this.physics.add.sprite(2450, 460, "EndBoss", 0);
    deadBoss = this.physics.add.sprite(2450, 600, "DeadBoss", 0);
    //add plateforms
    var ground = this.physics.add.staticGroup({
      key: "ground",
      repeat: 50,
      setXY: {
        x: 0,
        y: 630,
        stepX: 70
      }
    });
    var wall1 = this.physics.add.staticGroup({
      key: "wall",
      setXY: {
        x: -25,
        y: 500,
        setY: 120
      }
    });
    var wall2 = this.physics.add.staticGroup({
      key: "wall",
      setXY: {
        x: 2670,
        y: 450,
        setY: 120
      }
    });

    //COLLISION

    this.physics.add.collider(player, [wall1, wall2, ground]);
    this.physics.add.collider(EndBoss, [wall1, wall2, ground, player]);
    this.physics.add.collider(ground, [
      tumbleweed,
      tumbleweed2,
      tumbleweed3,
      tumbleweed4,
      deadBoss
    ]);
    this.physics.add.collider(deadBoss, [ground]);
    //TEXTES
    LastTip = this.add.text(250, 60, "'Sit & Watch'", {
      fontSize: "50px",
      fill: "#FFFFFF",
      align: "center"
    });
    //ANIMATIONS

    animation = this.anims.create({
      key: "endright",
      frames: this.anims.generateFrameNumbers(name, {
        start: 0,
        end: 5
      }),
      frameRate: 8,
      repeat: -1
    });
    kamehameha = this.create = this.anims.create({
      key: "kamehameha",
      frames: this.anims.generateFrameNumbers(name, {
        start: 15,
        end: 22
      }),
      frameRate: 5,
      repeat: -1
    });
    dead = this.anims.create({
      key: "boss_dead",
      frames: this.anims.generateFrameNumbers("DeadBoss", {
        start: 0,
        end: 8
      }),
      frameRate: 6,
      repeat: 1
    });
    this.anims.create({
      key: "boss_walk",
      frames: this.anims.generateFrameNumbers("EndBoss", {
        start: 0,
        end: 9
      }),
      frameRate: 6,
      repeat: -1
    });
    rollAway = this.anims.create({
      key: "rollAway",
      frames: this.anims.generateFrameNumbers("Tumbleweed", {
        start: 0,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    });
    // --->>> a definir il est tard jsuis fatigué

    tumbleweed.play("rollAway", true);
    tumbleweed2.play("rollAway", true);
    tumbleweed3.play("rollAway", true);
    tumbleweed4.play("rollAway", true);
    tumbleweed.setVelocityX(-70);
    tumbleweed2.setVelocityX(-110);
    tumbleweed3.setVelocityX(-80);
    tumbleweed4.setVelocity(-50);
    player.setVelocityX(130);
    this.cameras.main.setSize(900, 1000);
    this.cameras.main.setBounds(0, 0, 2650);
    this.cameras.main.startFollow(player);
  }
  update() {
    musics.stop();
    this.EndScene();
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
  EndScene() {
    // player.setVelocityX(80);
    if (player.body.x > 1800) {
      player.anims.stop(animation);
      player.setVelocity(0);
      deadBoss.play(dead, true);
      question_mark.setY(500);
      EndBoss.setVelocityX(-20);
      deadBoss.setVelocityX(-20);
      setInterval(() => {
        this.cameras.main.stopFollow(player);
        this.cameras.main.setSize(1500, 1000);
        this.cameras.main.setBounds(1740, 0, 2650);
        question_mark.setX(0);
      }, 1000);
      if (EndBoss.body.x < 2000) {
        EndBoss.setVelocityX(0);
        deadBoss.setVelocityX(0);
        EndBoss.setY(800);
        deadBoss.setY(500);
        var flash = this.cameras.main.flash(60);

        setInterval(() => {
          player.setX(2450);
          deadBoss.setTint(0xff0000);
          setInterval(() => {
            location.reload();
            //this.scene.start("Accueil");
          }, 2000);
        }, 1000);
      }
    } else {
      player.play(animation, true);
      EndBoss.play("boss_walk", true);
    }
  }
}
export default Scene4;
