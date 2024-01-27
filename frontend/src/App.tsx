import axios from 'axios'
import { useState } from 'react'

const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY || ''
const GIPHY_API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}`
const ITEMS_PER_PAGE = 25
const API_URL = 'http://localhost:3000/search'

export function ImagePreview({ url }: { url: string }) {
  return (<img src={url} />)
}

export function App() {
  const [foundImages, setFoundImages] = useState([] as any[])
  const [offset, setOffset] = useState(0)
  const [searchTerm, setSearchTerm] = useState('')

  const searchApi = async (term = '', offset = 0) => {
    const { data } = await axios.get(`${GIPHY_API_URL}&limit=${ITEMS_PER_PAGE}&offset=${offset}&q=${term}`)
    return data
  }

  const getSearchInputElement = () => (document.getElementById('search-input') as HTMLInputElement)

  const getTerm = () => getSearchInputElement().value?.trim() || ''

  const saveSearch = async (term = searchTerm) => {
    await axios.post(API_URL, { searchTerm: term })
  }

  const handleSearch = async () => {
    const term = getTerm()
    const { data } = await searchApi(term)
    setFoundImages(_ => data)
    if (term !== searchTerm) {
      await saveSearch(term)
      setSearchTerm(term)
    }
  }

  const handleLoadMore = async () => {
    const term = getTerm()
    const newOffset = offset + ITEMS_PER_PAGE
    const { data } = await searchApi(term, newOffset)
    setFoundImages((prev) => ([...prev, ...data]))
    setOffset(newOffset)
  }

  const resetSearch = () => {
    setFoundImages([])
    setOffset(0);
    getSearchInputElement().value = ''
  }

  return (
    <>
      <section className="search-section">
        <input id="search-input" type="text" placeholder="Search" />
        <button id="search-button" onClick={handleSearch}>Search</button>
        <button id="reset-button" onClick={() => resetSearch()}>Reset</button>
      </section>
      <section id="results-section">
        {!!foundImages.length &&
          foundImages.map((item, idx) => {
            const { images: { fixed_height_small: { url } } } = item
            return <ImagePreview key={Math.random() + idx} url={url} />
          })
        }
      </section>
      <section className="search-section">
        {!!foundImages.length &&
          <button id="load-more-button" onClick={handleLoadMore}>Load more</button>
        }
      </section>
    </>
  )
}
