import Scene1 from "./Scenes/Scene1";
var musicGame;
// CHOOSE PLAYER
class Menu extends Phaser.Scene {
  constructor() {
    super({ key: "Menu" });
  }
  preload() {
    this.load.image("Menu-bg", "assets/menu/background-menu.png");
    this.load.image("Bouton", "assets/menu/bouton.png");
    this.load.audio("gameMusic", "assets/game_music.wav");
  }
  create() {
    this.add.image(450, 300, "Menu-bg");
    musicGame = this.sound.add("gameMusic", {
      volume: 0.8,
      loop: true
    });
    musicGame.play();
    var Player1Input = this.add.image(450, 100, "Bouton");
    this.add.text(360, 90, "Tux de Linux", {
      fontsize: "55px"
    });
    Player1Input.setInteractive();

    Player1Input.on(
      "pointerdown",
      () => {
        this.scene.start("scene4", {
          name: "Tux",
          score: 0,
          health: 5,
          music: musicGame
        });
      },
      this
    );

    var Player2Input = this.add.image(450, 250, "Bouton");
    this.add.text(360, 240, "Fox de Firefox", {
      fontsize: "55px"
    });
    Player2Input.setInteractive();
    Player2Input.on(
      "pointerdown",
      () => {
        this.scene.start("scene1", {
          name: "Fox",
          score: 0,
          health: 5,
          music: musicGame
        });
      },
      this
    );

    var Player3Input = this.add.image(450, 400, "Bouton");
    this.add.text(360, 390, "Kisi de KonsolScript", {
      fontsize: "55px"
    });
    Player3Input.setInteractive();
    Player3Input.on(
      "pointerdown",
      () => {
        this.scene.start("scene1", {
          name: "Kisi",
          score: 0,
          health: 5,
          music: musicGame
        });
      },
      this
    );
  }
  update() {}
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
export default Menu;
