import type Phaser from 'phaser'
import { MainScene } from '#/scene/main'
import type { Direction } from '#/core/Direction'

export class Player {
  constructor(
    private sprite: Phaser.GameObjects.Sprite,
    private tilePos: Phaser.Math.Vector2,
  ) {
    const offsetX = MainScene.TILE_SIZE / 2
    const offsetY = MainScene.TILE_SIZE

    this.sprite.setOrigin(0.5, 1)
    this.sprite.setPosition(
      tilePos.x * MainScene.TILE_SIZE + offsetX,
      tilePos.y * MainScene.TILE_SIZE + offsetY,
    )
    this.sprite.setFrame(1)
  }

  getPosition(): Phaser.Math.Vector2 {
    return this.sprite.getBottomCenter()
  }

  setPosition(position: Phaser.Math.Vector2): void {
    this.sprite.setPosition(position.x, position.y)
  }

  stopAnimation(direction: Direction) {
    const animationManager = this.sprite.anims.animationManager
    const stagingFrame = animationManager.get(direction).frames[1].frame.name
    this.sprite.anims.stop()
    this.sprite.setFrame(stagingFrame)
  }

  startAnimation(direction: Direction) {
    this.sprite.anims.play(direction)
  }

  getTilePos() {
    return this.tilePos.clone()
  }

  setTilePos(tilePosition: Phaser.Math.Vector2) {
    this.tilePos = tilePosition.clone()
  }

  private _setDepth(depth: number) {
    this.sprite.setDepth(depth)
  }

  updateDepth() {
    this._setDepth(this.getTilePos().y + 1 / 2)
  }
}
