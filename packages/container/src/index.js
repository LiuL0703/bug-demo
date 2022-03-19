import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import apps from './apps';
import AppManager from './AppManager';

function renderApp () {
  apps.forEach(AppManager.registerApp)
  ReactDOM.render(<App />,document.getElementById('root'));
}
renderApp()

export {
  React,
  ReactDOM
}