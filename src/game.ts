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