import "phaser";
import Menu from "./Menu";
import Scene1 from "./Scenes/Scene1";
import Accueil from "./Accueil";
import Scene2 from "./Scenes/Scene2";
import Scene3 from "./Scenes/Scene3";
import Scene4 from "./Scenes/Scene4";
import Scene5 from "./Scenes/Scene5";

var config = {
  type: Phaser.AUTO,
  width: 900,
  height: 600,
  backgroundColor: "white",
  physics: {
    default: "arcade",
    arcade: {
      gravity: {
        y: 600
      },
      debug: false
    }
  },
  scene: [Accueil, Menu, Scene1, Scene2, Scene3, Scene4, Scene5],
  audio: {
    disableWebAudio: true
  }
};
var game = new Phaser.Game(config);
