import { useContext } from "react"
import { ListContext } from "./App"

export function List() {
  const { listCount } = useContext(ListContext)

  return (
    <>
      <ul>
        {!!listCount &&
          new Array(listCount)
            .fill(true)
            .map((_el, idx) => (<li key={Math.random() + idx + 1}>Item {idx + 1}</li>))
        }
      </ul>
    </>
  )
}
