import type { Scene } from 'phaser'
import { NPC } from '../../class/NPC'
import type { Timeline } from '@/components/plugin/types/dialog'
import { ContentType } from '@/components/plugin/types/dialog'

const canvanTimeline = [
  {
    start: [
      { type: ContentType.CHAT, text: '何が見たいですか？' },
      {
        type: ContentType.CHOICE,
        text: '見たいものを選んでください',
        choices: [
          { text: 'スキル', nextId: 'skillScene' },
          { text: '別に…' },
        ],
      },
    ],
    skillScene: [
      { type: ContentType.SCENE, sceneId: 'skillScene' },
    ],
  },
] as Timeline[]

export class CanvanNPC extends NPC {
  constructor(scene: Scene) {
    super(scene, new Phaser.Math.Vector2(10, 5), 'canvan', canvanTimeline, 1)
  }
}
