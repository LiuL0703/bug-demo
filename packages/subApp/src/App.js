import React, { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  return <div onClick={()=> {
    console.log({count})
    setCount(count+1)}
    } >Sub APP<h1>Count is : {count}</h1></div>
}

export default App
