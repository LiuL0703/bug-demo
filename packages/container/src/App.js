import React from 'react'
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import About from './About';
import Header from './Header';
import Loadable from 'react-loadable'

const Logo = () => {
  return <div>LOGO</div>
}

const loadableComponent = (loader) => {
  return Loadable({
    loader: () =>
      loader().then(
        (res) => {
          return res
        },
        (e) => () => {
          console.log(e)
        }
      ),
    loading() {
      return (
        <div>loading</div>
      )
    }
  })
}

const loadSubApp = (subAppInfo) => {
  const { name, host } = subAppInfo
  return new Promise((resolve, reject)=> {
    fetch(`${host}/${name}/asset-manifest.json`)
      .then(res => res.json())
      .then(manifest => {
        const script = document.createElement('script');
        script.src = `${host}${manifest.files['main.js']}`;
        const timeout = setTimeout(()=>{
          console.error(`MicroApp ${name} timeout`);
          reject(new Error(`MicroApp ${name} timeout`));
        },20000)
        script.onload = () => {
          clearTimeout(timeout)
          const app = window[name]
          console.log({app, name})
          console.log(`MicroApp ${name} loaded success`);
          resolve(app)
        }
        script.onerror = (e) => {
          clearTimeout(timeout);
          console.error(`MicroApp ${name} loaded error`, e);
          reject(e)
        }
        document.body.appendChild(script);
      })
  })
}

const subLoader = (name) => async () => {
  const App = await loadSubApp({ name: 'subApp', host: process.env.REACT_APP_SUBAPP_HOST })
  console.log({App, window})
  return App[name]
}



const App = () => {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Logo />
        <ul>
          <li>
          <Link to="/">Home</Link>
          </li>
          <li>
          <Link to="/header">header</Link>
          </li>
          <li>
          <Link to="/sub-app">subApp</Link>
          </li>
          <li>
          <Link to="/sub-app/foo">subApp foo</Link>
          </li>
          
        </ul>
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/header" render={() => <Header /> }/>
          <Route exact path="/sub-app/foo" render={()=> {
            const RenderSubApp = loadableComponent(subLoader('Foo'))
            return <RenderSubApp />
          }}/>
          <Route exact path="/sub-app" render={()=> {
            const RenderSubApp = loadableComponent(subLoader('Count'))
            return <RenderSubApp />
          }}/>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  )
}

export default App