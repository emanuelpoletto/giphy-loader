import { useContext } from 'react'
import { ListContext } from './App'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Home.css'

export function Home() {
  const { listCount, setListCount } = useContext(ListContext)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setListCount((count) => count + 1)}>
          add item
        </button>
        &nbsp;
        <button>
          count: {listCount}
        </button>
        &nbsp;
        <button onClick={() => setListCount((count) => Math.max(count - 1, 0))}>
          remove item
        </button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
