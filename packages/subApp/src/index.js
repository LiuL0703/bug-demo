import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import App from './App';

window.renderApp = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

const Count = () => {
  const [count, setCount] = useState(0)

  return (
    <div onClick={()=> setCount(count+10)} >
      <h1>SubApp</h1>
      This is a React Hooks Component.<br />
      Count <h2>Count is : {count}</h2>
    </div>
  )
}

export {
  App,
  Count,
}