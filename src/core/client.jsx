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

console.log(context);

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
