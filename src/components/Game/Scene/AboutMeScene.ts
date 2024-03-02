import EscMenuControls from '../phasercore/EscMenuControls'
import { SceneBase } from './SceneBase'

const today = new Date()
const birthday = new Date(2005, 3 - 1, 18) // month is index

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
}

const dialogText = `名前：とれいす（toreis）
誕生日：${birthday.toLocaleDateString('ja-JP', dateOptions)}（${
  today.getFullYear()
  - birthday.getFullYear()
  - (today.getMonth() <= birthday.getMonth()
  && today.getDate() < birthday.getDate()
    ? 1
    : 0)
}歳）

学校：National Institute of Technology,
　　　Kisarazu College
所属：情報工学科 4年
`

export class AboutMeScene extends SceneBase {
  private menuControls!: EscMenuControls
  private aboutMeUiLayer!: Phaser.GameObjects.Container
  private playerSprite?: Phaser.GameObjects.Sprite

  constructor() {
    super('aboutMeScene')
  }

  update() {
    this.menuControls.update()
  }

  private updateCalledByScene(scene: Phaser.Scene) {
    this.resize()
    this.menuControls.updateCalledByScene(scene)
  }

  private resize() {
    const width = this.scene.systems.game.canvas.width
    const height = this.scene.systems.game.canvas.height

    this.aboutMeUiLayer.removeAll(true)
    this.createBackground()
    this.createRightDialog(dialogText)
    this.playerSprite!.setPosition(width / 4, height / 2)
  }

  create(scene: Phaser.Scene) {
    this.sys.events.on(Phaser.Scenes.Events.WAKE, (_thisScene: Phaser.Scene, ...args: Phaser.Scene[]) => {
      this.updateCalledByScene(args[0])
    })

    this.scene.systems.scale.on(Phaser.Scale.Events.RESIZE, () => {
      this.resize()
    })
    this.aboutMeUiLayer = this.add.container(0, 0)
    this.menuControls = new EscMenuControls(scene.input, this)

    this.createBackground()
    this.createRightDialog(dialogText)
    this.createSprite()

    const nameContainer = this.add.container(0, 0)
    this.aboutMeUiLayer.add(nameContainer)

    this.playerSprite!.anims.startAnimation('aboutMePlayerRotation')
  }

  createBackground() {
    const width = this.scene.systems.game.canvas.width
    const height = this.scene.systems.game.canvas.height

    const backgroundObj = new Phaser.GameObjects.Rectangle(
      this,
      width / 2,
      height / 2,
      width,
      height,
    ).setFillStyle(0x545454, 0.5)

    this.aboutMeUiLayer.add(backgroundObj)
  }

  createRightDialog(text?: string) {
    const cameraX = this.cameras.main.scrollX
    const cameraY = this.cameras.main.scrollY
    const width = this.scene.systems.game.canvas.width
    const height = this.scene.systems.game.canvas.height

    const dialogObj = new Phaser.GameObjects.Rectangle(
      this,
      (width / 7) * 5 + cameraX,
      height / 2 + cameraY,
      (width / 7) * 3,
      (height / 6) * 5,
    )
      .setStrokeStyle(3, 0x907748, 1)
      .setFillStyle(0x454851, 0.9)

    this.aboutMeUiLayer.add(dialogObj)

    if (text)
      this.createRightDialogText(text)
  }

  createRightDialogText(text: string) {
    const cameraX = this.cameras.main.scrollX
    const cameraY = this.cameras.main.scrollY
    const width = this.scene.systems.game.canvas.width
    const height = this.scene.systems.game.canvas.height

    const textObj = new Phaser.GameObjects.Text(this, width / 2 + cameraX + 10,
      height / 2
    + cameraY
        - (height / 12) * 5
        + 10,
      text,
      {
        fontFamily: 'DotGothic16',
        fontSize: '1.5rem',
        lineSpacing: 16,
        wordWrap: { width: width / 7 * 3 - 25 },
      })

    this.aboutMeUiLayer.add(textObj)
  }

  createSprite() {
    const width = this.scene.systems.game.canvas.width
    const height = this.scene.systems.game.canvas.height

    this.playerSprite = this.add.sprite(0, 0, 'player')
    this.playerSprite.setDepth(10)
    this.playerSprite.setScale(8)
    this.playerSprite.setFrame(1)
    this.playerSprite.setPosition(width / 4, height / 2)

    this.anims.create({
      key: 'aboutMePlayerRotation',
      frameRate: 1,
      frames: this.anims.generateFrameNumbers('player', {
        frames: [1, 4, 10, 7],
      }),
      repeat: -1,
    })
  }
}
