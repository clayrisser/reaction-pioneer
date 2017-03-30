import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { connectHistory } from 'redux-history';
import App from '../components/App';
import configureStore from '../redux/configureStore';
import UniversalRouter from 'universal-router';
import routes from '../routes';
import queryString from 'query-string';

const context = {
  store: configureStore()
};

const container = document.getElementById('app');

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
    ReactDOM.render((<App context={context}>
      {route.component}
    </App>), container, onRenderComplete.bind(route, location));
  } catch(err) {
    console.error(err);
  }
}

function onRenderComplete() {
  console.log('render complete');
}

history.listen(onLocationChange);
onLocationChange(history.location);

/* const unconnectHitory = connectHistory(history, context.store);
 * 
 * let currentLocation = history.location;
 * 
 * console.log(currentLocation);
 * 
 * history.listen(async (location) => {
 *   const router = new UniversalRouter(routes);
 *   const route = await router.resolve({
 *     path: location.pathname,
 *     query: queryString.parse(location.search)
 *   });
 *   if (currentLocation.key !== location.key) return;
 *   if (route.redirect) history.replace(route.redirect);
 *   ReactDOM.render(<App context={context}>{route.component}</App>);
 * });*/
