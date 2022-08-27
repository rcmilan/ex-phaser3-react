import Phaser from "phaser";
import CreditsScene from "./scenes/credits";
import MainMenuScene from "./scenes/main-menu";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#FFFAFA",
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
  scene: [MainMenuScene, CreditsScene],
};

export default new Phaser.Game(config);

/*
https://phaser.discourse.group/t/how-to-correctly-switch-back-and-forth-between-scenes/8011
https://www.thepolyglotdeveloper.com/2020/09/switch-between-scenes-phaser-game/
*/
