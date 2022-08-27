import Phaser from "phaser";
import MainMenuScene from "./scenes/main-menu";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: "game",
  backgroundColor: "#ADD8E6",
  scale: {
    mode: Phaser.Scale.ScaleModes.FIT,
    width: window.innerWidth,
    height: window.innerHeight,
    autoCenter: Phaser.Scale.Center.CENTER_BOTH,
  },
  scene: [MainMenuScene],
};

export default new Phaser.Game(config);
