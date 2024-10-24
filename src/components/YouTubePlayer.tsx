import React, { useRef, useState, useEffect, useContext } from 'react'
import YouTube, { YouTubeProps, YouTubePlayer as Player } from 'react-youtube'
import { Card, CardBody, Image, Button, Slider } from '@nextui-org/react'
import { PlayIcon, XMarkIcon, PauseIcon } from '@heroicons/react/24/solid'
import { seconds2hms, zeroPad } from '../utils/time'
import Context from '../context'

export type YouTubePlayerProps = {
  title: string
  thumbnail: string
  videoId: string
}

const YouTubePlayer: React.FC = () => {
  const { video, setVideo } = useContext(Context)
  const [loading, setLoading] = useState(true)
  const [isStarted, setIsStarted] = useState(false)
  const [duration, setDuration] = useState(0)
  const [elapsed, setElapsed] = useState(0)
  const playerRef = useRef<Player | null>(null)

  const onPlayerReady: YouTubeProps['onReady'] = (event) => {
    playerRef.current = event.target
    setLoading(false)
    setIsStarted(true)
    setDuration(event.target.getDuration())
  }

  const opts: YouTubeProps['opts'] = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  useEffect(() => {
    if (playerRef.current) {
      const player = playerRef.current
      if (isStarted) {
        player.playVideo()
      } else {
        player.pauseVideo()
      }
    }
  }, [isStarted])

  useEffect(() => {
    let IID: NodeJS.Timeout
    if (!loading) {
      IID = setInterval(() => {
        if (playerRef.current)
          setElapsed(Math.floor(playerRef.current.getCurrentTime()))
      }, 150)
    }

    return () => {
      clearInterval(IID)
    }
  }, [loading])

  return (
    <>
      {!!video && (
        <>
          <YouTube
            className='absolute top-[-100%]'
            videoId={video.videoId}
            opts={opts}
            onReady={onPlayerReady}
          />
          <Card
            isBlurred
            className='border-none bg-background/60 dark:bg-default-100/50 w-[100vw] fixed bottom-0 left-0'
            shadow='sm'
            radius='none'
          >
            <CardBody className='pt-2 pb-0 px-3 overflow-y-visible'>
              <div className='flex justify-between'>
                <div className='flex gap-2 items-center'>
                  <Image
                    className='object-cover'
                    width={50}
                    height={50}
                    src={video.thumbnail}
                  />
                  <div className='flex flex-col gap-1'>
                    <p>{video.title}</p>
                    <p className='text-tiny text-default-500'>
                      {zeroPad(seconds2hms(elapsed)[1])}:
                      {zeroPad(seconds2hms(elapsed)[2])}/
                      {zeroPad(seconds2hms(duration)[1])}:
                      {zeroPad(seconds2hms(duration)[2])}
                    </p>
                  </div>
                </div>
                <div className='flex items-center'>
                  <Button
                    onPress={() => setIsStarted((prev) => !prev)}
                    isIconOnly
                    className='data-[hover]:bg-transparent'
                    variant='light'
                    size='sm'
                    isDisabled={loading}
                  >
                    {isStarted ? (
                      <PauseIcon className='size-5' />
                    ) : (
                      <PlayIcon className='size-5' />
                    )}
                  </Button>
                  <Button
                    isIconOnly
                    className='data-[hover]:bg-transparent'
                    variant='light'
                    size='sm'
                    onPress={() => setVideo(undefined)}
                  >
                    <XMarkIcon className='size-5' />
                  </Button>
                </div>
              </div>
              <Slider
                aria-label='Music progress'
                classNames={{
                  track: 'bg-default-500/30',
                  thumb: 'w-2 h-2 after:w-2 after:h-2 after:bg-foreground',
                }}
                color='foreground'
                minValue={0}
                maxValue={duration}
                value={elapsed}
                size='sm'
              />
            </CardBody>
          </Card>
        </>
      )}
    </>
  )
}

export default YouTubePlayer
