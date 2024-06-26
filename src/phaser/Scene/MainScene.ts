import Phaser from 'phaser'
import { ChatContent } from '../class/Timeline/types'
import { SceneBase } from './SceneBase'
import { NPC_Reisan } from './MainSceneNPC/reisanNPC'
import { CanvanNPC } from './MainSceneNPC/canvanNPC'
import { Player } from '@/phaser/class/Player'
import { GridControls } from '@/phaser/core/GridControls'
import { GridPhysics } from '@/phaser/core/GridPhysics'
import { Direction } from '@/phaser/core/Direction'
import type { Timeline } from '@/phaser/plugin/dialogPlugin'

export class MainScene extends SceneBase {
  static readonly TILE_SIZE = 32
  private gridControls!: GridControls
  private gridPhysics!: GridPhysics

  constructor() {
    super('MainScene')
  }

  update(_time: number, delta: number) {
    this.gridControls.update()
    this.gridPhysics.update(delta)
  }

  preload() {
    this.load.image('tiles', 'tilemap/map1.png')
    this.load.tilemapTiledJSON('map', 'tileset/map2.json')
    this.load.spritesheet('player', 'character/reisan.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('npc1_reisan', 'character/reisan.png', {
      frameWidth: 32,
      frameHeight: 48,
    })
    this.load.spritesheet('canvan', 'character/canvan.png', {
      frameWidth: 32,
      frameHeight: 32,
    })
  }

  create() {
    const map = this.make.tilemap({ key: 'map' })

    const tiles = map.addTilesetImage('map', 'tiles')

    const layer = map.createLayer(0, tiles!, 0, 0)
    layer?.setDepth(-3)

    const layer2 = map.createLayer(1, tiles!, 0, 0)
    layer2?.setDepth(-2)

    const layer3 = map.createLayer(2, tiles!, 0, 0)
    layer3?.setDepth(-1)

    const layer4 = map.createLayer(3, tiles!, 0, 0)
    layer4?.setDepth(0)

    const reisanNPC = new NPC_Reisan(this)

    const reisanNPCSprite = this.add.existing(reisanNPC)
    reisanNPCSprite.scale = 2

    const playerSprite = this.add.sprite(0, 0, 'player')
    playerSprite.setDepth(5)
    playerSprite.scale = 2
    this.cameras.main.startFollow(playerSprite)
    this.cameras.main.roundPixels = true
    const player = new Player(playerSprite, new Phaser.Math.Vector2(6, 6))

    const canvanNPC = new CanvanNPC(this)
    const canvanNPCSplite = this.add.existing(canvanNPC)
    canvanNPCSplite.scale = 2

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

    this.gridPhysics = new GridPhysics(player, map)
    this.gridControls = new GridControls(this.input, this.gridPhysics)

    const timeline = {
      start: [
        new ChatContent(this.dialogPlugin, {
          text: 'とれいすさんのポートフォリオへようこそ！（クリックか「スペースキー」で進む）',
        }),
        new ChatContent(this.dialogPlugin, {
          text: 'まだまだ実装中だけど、色々見ていってね :)',
        }),
        new ChatContent(this.dialogPlugin, {
          text: 'Eキーで話しかけたり、看板を見たりできるよ！',
        }),
      ],
    } as Timeline

    this.npcManager.init()
    this.npcManager.addNPC(canvanNPC, reisanNPC)

    this.dialogPlugin.init()
    this.dialogPlugin.setTimeline(timeline)

    this.createPlayerAnimation(Direction.UP, 11, 9)
    this.createPlayerAnimation(Direction.DOWN, 0, 2)
    this.createPlayerAnimation(Direction.LEFT, 3, 5)
    this.createPlayerAnimation(Direction.RIGHT, 6, 8)
  }

  private createPlayerAnimation(
    name: string,
    startFrame: number,
    endFrame: number,
  ) {
    this.anims.create({
      key: name,
      frames: this.anims.generateFrameNumbers('player', {
        start: startFrame,
        end: endFrame,
      }),
      frameRate: 10,
      repeat: -1,
      yoyo: true,
    })
  }
}
