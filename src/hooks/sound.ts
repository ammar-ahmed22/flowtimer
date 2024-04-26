import { useState, useEffect } from 'react'
import { Howl } from 'howler'
import type { SoundSpriteDefinitions } from 'howler'

export type UseSoundOptions = {
  sprite?: SoundSpriteDefinitions
  volume?: number
}

export const useSound = (src: string, options?: UseSoundOptions) => {
  const [sound] = useState(
    new Howl({
      src: [src],
      sprite: options?.sprite,
      volume: options?.volume ?? 0.5,
    }),
  )

  useEffect(() => {
    if (options?.volume) {
      sound.volume(options.volume)
    }
  }, [options?.volume, sound])

  const play = (spriteId?: string) => {
    sound.play(spriteId)
  }

  const stop = () => {
    sound.stop()
  }

  return [play, stop]
}
