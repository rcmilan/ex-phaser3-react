import Phaser from "phaser";
import { CREDITS_SCENE, MAIN_MENU_SCENE } from "../constants/scene-keys";

export default class CreditsScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private buttons: Phaser.GameObjects.Rectangle[] = [];
  private buttonSelector!: Phaser.GameObjects.Rectangle;

  constructor() {
    super(CREDITS_SCENE);
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  confirmSelection() {
    const button = this.buttons[0];

    // emit the 'selected' event
    button.emit("selected");
  }

  create() {
    const { width, height } = this.scale;
    const btnColor = 0x1f1f1f;
    const btnHeight = 50;
    const btnWidth = 150;

    const backButton = this.add
      .rectangle(width * 0.5, height * 0.6, btnWidth, btnHeight, btnColor)
      .setDisplaySize(btnWidth, btnHeight)
      .setStrokeStyle(4, 0xa0a0a0);

    this.add
      .text(backButton.x, backButton.y, "Back")
      .setOrigin(0.5)
      .setColor("#ffffff");

    this.buttons.push(backButton);

    // button selector
    this.buttonSelector = this.add
      .rectangle(0, 0, 15, 15, 0xff0000)
      .setStrokeStyle(1, 0x0000ff);

    this.buttonSelector.x = backButton.x + backButton.displayWidth * 0.5;
    this.buttonSelector.y = backButton.y + 10;

    this.tweens.add({
      targets: this.buttonSelector,
      angle: 90,
      repeat: -1,
    });

    // events
    backButton.on("selected", () => {
      console.log("back");

      this.scene.switch(MAIN_MENU_SCENE);
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      backButton.off("selected");
    });
  }

  update() {
    console.log("credits update");

    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(
      this.cursors.space!
    );

    if (spaceJustPressed) {
      this.confirmSelection();
    }
  }
}
