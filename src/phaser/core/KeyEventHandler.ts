import Phaser from 'phaser'

interface Keys { [keyof: string]: number }
interface Keyset { [keyof: string]: Phaser.Input.Keyboard.Key }

export class KeyEventHandler {
  private keyHandler?: Keyset
  constructor(private input: Phaser.Input.InputPlugin, private keys: Keys) {
    this.keyHandler = this.input.keyboard?.addKeys({
      ...keys,
    }) as Keyset
  }

  isPress(keyName: string): boolean {
    return this.keyHandler?.[keyName].isDown || false
  }

  isJustDown(keyName: string): boolean {
    return this.keyHandler?.[keyName] ? Phaser.Input.Keyboard.JustDown(this.keyHandler?.[keyName]) : false
  }
}
