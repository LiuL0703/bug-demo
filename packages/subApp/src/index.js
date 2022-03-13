import React, { useState } from 'react';
// import ReactDOM from 'react-dom';
import App from './App';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

const Count = () => {
  const [count, setCount] = useState(0)

  return (
    <div onClick={()=> setCount(count+10)} >
      This is a React Hooks Component.<br />
      Count <h1>Count is : {count}</h1>
    </div>
  )
}

class Foo extends React.Component {
  state = {
    count: 0
  }
  handleClick = () => {
    const { count } = this.state
    this.setState({
      count: count + 1
    })
  }

  render() {
    return (
      <div onClick={()=> this.handleClick()}>This is a React Class Component--{this.state.count}</div>
    )
  }
}


export {
  App,
  Count,
  Foo
}