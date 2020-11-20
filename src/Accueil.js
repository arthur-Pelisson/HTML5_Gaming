import Menu from "./Menu";

// CHOOSE PLAYER
var playerAccueil;
var playerAccueil2;
var boss;
var music;

class Accueil extends Phaser.Scene {
  constructor() {
    super({ key: "Accueil" });
  }
  preload() {
    this.load.image("Menu-bg", "assets/menu/background-menu.png");
    this.load.audio("theme", "assets/music_wav.wav");
    this.load.spritesheet("Kisi", "assets/scenes/Kisi.png", {
      frameWidth: 55,
      frameHeight: 80
    });
    this.load.image("Bouton", "assets/menu/bouton.png");
    this.load.image("ground", "assets/scenes/ground1.png");
    this.load.spritesheet("boss", "assets/scenes/boss_1_walking.png", {
      frameWidth: 300,
      frameHeight: 170
    });
    this.load.image("keyboard", "assets/keyboard.png");
  }
  create() {
    music = this.sound.add("theme", {
      volume: 1,
      loop: false
    });
    music.play();

    this.add.image(450, 300, "Menu-bg");
    this.add.image(140, 55, "keyboard");

    // DEFINES PLAYER & BOSS POSITION AT START

    playerAccueil = this.physics.add.sprite(10, 300, "Kisi", 0);
    boss = this.physics.add.sprite(1100, 400, "boss", 0);

    // -------------------------------------//
    playerAccueil.setVelocityX(150);
    // 200
    var ground = this.physics.add.staticGroup({
      key: "ground",
      repeat: 50,
      setXY: {
        x: 0,
        y: 550,
        stepX: 70
      }
    });
    var ChoosePlayer = this.add.image(450, 50, "Bouton");
    this.add.text(360, 40, "Choisir son champion", {
      fontsize: "55px"
    });

    // SET FIXED TEXT

    this.add.text(60, 105, "Use Arrow for moving", {
      fontsize: "100px",
      fill: "#000"
    });
    setInterval(() => {
      this.add.text(150, 160, "Jump over little monster...", {
        fontsize: "100",
        fill: "#000"
      });
    }, 1000);

    //
    ChoosePlayer.setInteractive();
    ChoosePlayer.on(
      "pointerdown",
      () => {
        music.stop();
        this.scene.start("Menu", { name: "" });
      },
      this
    );
    this.physics.add.collider(ground, [playerAccueil, playerAccueil2, boss]);

    this.anims.create({
      key: "accueil_right_Kisi",
      frames: this.anims.generateFrameNumbers("Kisi", {
        start: 0,
        end: 5
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "accueil_left_Kisi",
      frames: this.anims.generateFrameNumbers("Kisi", {
        start: 9,
        end: 11
      }),
      frameRate: 20,
      repeat: -1
    });
    this.anims.create({
      key: "boss_walking",
      frames: this.anims.generateFrameNumbers("boss", {
        start: 0,
        end: 9
      }),
      frameRate: 8,
      repeat: -1
    });
    playerAccueil.anims.play("accueil_right_Kisi", true);
  }

  update() {
    //console.log(playerAccueil.body.x);
    if (playerAccueil.body.x > 910) {
      playerAccueil.setVelocity(-250);
      boss.setVelocity(-240);
      boss.anims.play("boss_walking", true);
      playerAccueil.anims.play("accueil_left_Kisi", true);
      playerAccueil.flipX = true;
      this.add.text(450, 160, "but be carefull at big ones!", {
        fontsize: "100px",
        fill: "#000"
      });
      if (playerAccueil.body.x < -100) {
        playerAccueil.setVelocity(250);
        boss.setVelocityX(250);
        boss.flipX = true;
      }
    }
  }
  render() {
    /*
    _____
                    __/_ ///
    *              / _/    \
    *              \/_\=[o=o]
    *               \_,    __)
    *                |     _\
    *                l______/
    *               /     :|
    *              /  \   ;|-
    *              \_______j
    *              ./.....\..
         */
  }
}
export default Accueil;
