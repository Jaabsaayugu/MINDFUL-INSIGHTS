import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="button">
        <button>Get Advice</button>
      </div>
    </>
  )
}

export default App
