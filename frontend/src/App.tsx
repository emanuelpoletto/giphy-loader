import axios from 'axios'
import { useState } from 'react'

const API_KEY = 'pLURtkhVrUXr3KG25Gy5IvzziV5OrZGa'
const API_URL = `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}`
const ITEMS_PER_PAGE = 25

export function ImagePreview({ url }: { url: string }) {
  return (<img src={url} />)
}

export function App() {
  const [foundImages, setFoundImages] = useState([])
  const [offset, setOffset] = useState(0)

  const searchApi = async (term = '', offset = 0) => {
    const { data } = await axios.get(`${API_URL}&limit=${ITEMS_PER_PAGE}&offset=${offset}&q=${term}`)
    return data
  }

  const getTerm = () => (document.getElementById('search-input') as HTMLInputElement)?.value || ''

  const handleSearch = async () => {
    const term = getTerm()
    const { data } = await searchApi(term)
    setFoundImages(_ => data)
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
    setOffset(0)
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
