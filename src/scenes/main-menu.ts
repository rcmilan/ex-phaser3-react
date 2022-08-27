import Phaser from "phaser";

export default class MainMenuScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private buttons: Phaser.GameObjects.Rectangle[] = [];
  private buttonSelector!: Phaser.GameObjects.Rectangle;
  private selectedButtonIndex = 0;

  constructor() {
    super("main-menu");
  }

  init() {
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  selectButton(index: number) {
    const currentButton = this.buttons[this.selectedButtonIndex];

    // set the current selected button no stroke
    currentButton.setStrokeStyle(0, 0xffffff);

    const button = this.buttons[index];

    // set the newly selected button to a gray stroke
    button.setStrokeStyle(4, 0xa0a0a0);

    // move the hand cursor to the right edge
    this.buttonSelector.x = button.x + button.displayWidth * 0.5;
    this.buttonSelector.y = button.y + 10;

    // store the new selected index
    this.selectedButtonIndex = index;
  }

  selectNextButton(change = 1) {
    let index = this.selectedButtonIndex + change;

    // wrap the index to the front or end of array
    if (index >= this.buttons.length) {
      index = 0;
    } else if (index < 0) {
      index = this.buttons.length - 1;
    }

    this.selectButton(index);
  }

  confirmSelection() {
    // get the currently selected button
    const button = this.buttons[this.selectedButtonIndex];

    // emit the 'selected' event
    button.emit("selected");
  }

  preload() {}

  create() {
    const { width, height } = this.scale;
    const btnColor = 0x1f1f1f;
    const btnHeight = 50;
    const btnWidth = 150;

    // Play button
    const playButton = this.add
      .rectangle(width * 0.5, height * 0.6, btnWidth, btnHeight, btnColor)
      .setDisplaySize(btnWidth, btnHeight);

    // Settings button
    const settingsButton = this.add
      .rectangle(
        playButton.x,
        playButton.y + playButton.displayHeight + 10,
        btnWidth,
        btnHeight,
        btnColor
      )
      .setDisplaySize(btnWidth, btnHeight);

    // Credits button
    const creditsButton = this.add
      .rectangle(
        settingsButton.x,
        settingsButton.y + settingsButton.displayHeight + 10,
        btnWidth,
        btnHeight,
        btnColor
      )
      .setDisplaySize(btnWidth, btnHeight);

    this.add.text(playButton.x, playButton.y, "Play").setOrigin(0.5); //.setColor("#ff0000");
    this.add
      .text(settingsButton.x, settingsButton.y, "Settings")
      .setOrigin(0.5);
    this.add.text(creditsButton.x, creditsButton.y, "Credits").setOrigin(0.5);

    this.buttons.push(playButton);
    this.buttons.push(settingsButton);
    this.buttons.push(creditsButton);

    // button selector
    this.buttonSelector = this.add
      .rectangle(0, 0, 15, 15, 0xff0000)
      .setStrokeStyle(1, 0x0000ff);

    this.tweens.add({
      targets: this.buttonSelector,
      angle: 90,
      repeat: -1,
    });

    this.selectButton(0);

    // events
    playButton.on("selected", () => {
      console.log("play");
    });

    settingsButton.on("selected", () => {
      console.log("settings");
    });

    creditsButton.on("selected", () => {
      console.log("credits");
    });

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      playButton.off("selected");
      settingsButton.off("selected");
      creditsButton.off("selected");
    });
  }

  update() {
    const upJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.up!);
    const downJustPressed = Phaser.Input.Keyboard.JustDown(this.cursors.down!);
    const spaceJustPressed = Phaser.Input.Keyboard.JustDown(
      this.cursors.space!
    );

    if (upJustPressed) {
      this.selectNextButton(-1);
    } else if (downJustPressed) {
      this.selectNextButton(1);
    } else if (spaceJustPressed) {
      this.confirmSelection();
    }
  }
}
