import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { connectHistory } from 'redux-history';
import App from '../components/App';
import configureStore from '../redux/configureStore';
import UniversalRouter from 'universal-router';
import queryString from 'query-string';
import ErrorReporter from './ErrorReporter';
import RedboxReact from 'redbox-react';
import deepForceUpdate from 'react-deep-force-update';
let routes = require('../routes').default;

const context = {
  insertCss: (...styles) => {
    const removeCss = styles.map(x => x._insertCss());
    return () => { removeCss.forEach(f => f()); };
  },
  store: configureStore()
};

let container = document.getElementById('app');
let appInstance = null;
let currentLocation = null;

async function onLocationChange(location, action) {
  currentLocation = location;
  if (currentLocation.key !== location.key) return;
  try {
    const router = new UniversalRouter(routes);
    const route = await router.resolve({
      path: location.pathname,
      query: queryString.parse(location.search)
    });
    if (route.redirect) {
      history.replace(route.redirect);
      return;
    }
    appInstance = ReactDOM.render((<App context={context}>
      {route.component}
    </App>), container, onRenderComplete.bind(route, location));
  } catch(err) {
    handleError(err, `Error: ${err.message}`);
    if (action && currentLocation.key === location.key) window.location.reload();
  }
}

function onRenderComplete() {}

function handleError(err, title) {
  console.error(err);
  appInstance = null;
  document.title = title;
  ReactDOM.render(<RedboxReact error={err} />, container);
}

if (module.hot) {
  module.hot.accept('../routes', () => {
    routes = require('../routes').default;
    if (appInstance) {
      try {
        deepForceUpdate(appInstance);
      } catch (err) {
        handleError(err, `Hot Update Error: ${err.message}`);
      }
    }
    onLocationChange(currentLocation);
  });
}

history.listen(onLocationChange);
window.addEventListener('error', (e) => handleError(e.error, `Runtime Error: ${e.error.message}`));
onLocationChange(history.location);
