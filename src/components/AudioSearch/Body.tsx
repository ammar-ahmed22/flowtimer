import React, { useState, useContext } from 'react'
import { Input, Button, Card, CardFooter, Image } from '@nextui-org/react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import axios from 'axios'
import Context from '../../context'
import { decodeHTML, createRequestURL } from '../../utils/misc'

type BodyProps = {
  onClose: () => void
}

const Body: React.FC<BodyProps> = ({ onClose }) => {
  const [query, setQuery] = useState('')
  const [videos, setVideos] = useState<any[]>([])
  const [nextPage, setNextPage] = useState<
    { nextToken: string; query: string } | undefined
  >(undefined)
  const { setVideo } = useContext(Context)

  const API_KEY = process.env.REACT_APP_GAPI_KEY
  const baseParams = {
    part: 'snippet',
    type: 'video',
    key: API_KEY,
  }

  const baseURL = 'https://www.googleapis.com/youtube/v3/search'

  const handleSubmitQuery = async () => {
    if (query === '') return
    try {
      console.log(baseParams)
      const url = createRequestURL(baseURL, {
        ...baseParams,
        maxResults: 6,
        q: query,
      })
      const response = await axios.get(url)
      setNextPage({ nextToken: response.data.nextPageToken, query })
      setVideos(response.data.items)
    } catch (err) {
      console.error('Error fetching videos', err)
    }
  }

  const handleGetMore = async () => {
    if (!nextPage) return
    try {
      const url = createRequestURL(baseURL, {
        ...baseParams,
        maxResults: 6,
        pageToken: nextPage.nextToken,
        q: nextPage.query,
      })
      const response = await axios.get(url)
      setNextPage({
        nextToken: response.data.nextPageToken,
        query: nextPage.query,
      })
      setVideos((prev) => [...prev, ...response.data.items])
    } catch (err) {
      console.error('Error fetching videos', err)
    }
  }
  return (
    <div className='h-full w-full flex flex-col p-2 mt-6'>
      <Input
        type='text'
        label='Search YouTube'
        variant='bordered'
        value={query}
        onValueChange={setQuery}
        endContent={
          <Button
            onPress={() => handleSubmitQuery()}
            isIconOnly
            color='default'
            variant='ghost'
            className='border-none data-[hover=true]:!bg-transparent'
          >
            <MagnifyingGlassIcon className='size-4' />
          </Button>
        }
        onKeyDown={(e) => {
          if (e.key === 'Enter' && query !== '') {
            handleSubmitQuery()
          }
        }}
      />

      <div className='flex flex-wrap gap-2 py-2 justify-center w-full'>
        {videos.length > 0 &&
          videos.map((video) => {
            return (
              <Card
                key={video.id.videoId}
                isFooterBlurred
                className='border-none w-full'
                isPressable
                onPress={() => {
                  setVideo({
                    title: decodeHTML(video.snippet.title),
                    thumbnail: video.snippet.thumbnails.high.url,
                    videoId: video.id.videoId,
                  })
                  onClose()
                }}
              >
                <Image
                  alt='Search result thumbnail'
                  classNames={{
                    img: 'object-cover w-full',
                    wrapper: 'w-full !max-w-none',
                  }}
                  src={video.snippet.thumbnails.high.url}
                />
                <CardFooter className='justify-center before:bg-white/10 border-white/20 border-1 overflow-hidden py-2 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10'>
                  <p className='text-tiny text-white/80 truncate'>
                    {decodeHTML(video.snippet.title)}
                  </p>
                </CardFooter>
              </Card>
            )
          })}
      </div>
      <div className='flex justify-center'>
        {nextPage && <Button onPress={() => handleGetMore()}>Load more</Button>}
      </div>
    </div>
  )
}

export default Body
