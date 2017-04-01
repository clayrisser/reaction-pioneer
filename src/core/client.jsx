import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import history from './history';
import { connectHistory } from 'redux-history';
import App from './App';
import configureStore from '../redux/configureStore';
import UniversalRouter from 'universal-router';
import queryString from 'query-string';
import ErrorReporter from './ErrorReporter';
import RedboxReact from 'redbox-react';
import deepForceUpdate from 'react-deep-force-update';
import FastClick from 'fastclick';
let routes = require('../routes').default;

class Client {
  context = {
    insertCss: (...styles) => {
      const removeCss = styles.map(x => x._insertCss());
      return () => { removeCss.forEach(f => f()); };
    },
    store: configureStore()
  };
  container = document.getElementById('app');
  appInstance = null;
  currentLocation = null;
  scrollPositionsHistory = {};

  constructor() {
    FastClick.attach(document.body);
    if (window.history && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    history.listen(this.onLocationChange);
    window.addEventListener('error', (e) => this.handleError(e.error, `Runtime Error: ${e.error.message}`));
    this.onLocationChange(history.location);
    this.hotReloading();
  }

  async onLocationChange(location, action) {
    this.updateScrollPostion();
    this.currentLocation = location;
    if (this.currentLocation.key !== location.key) return;
    try {
      let router = new UniversalRouter(routes);
      let route = await router.resolve({
        path: location.pathname,
        query: queryString.parse(location.search)
      });
      if (route.redirect) {
        history.replace(route.redirect);
        return;
      }
      this.appInstance = ReactDOM.render((<App context={this.context}>
        {route.component}
      </App>), this.container, this.onRenderComplete.bind(this, route, location));
    } catch(err) {
      this.handleError(err, `Error: ${err.message}`);
      if (action && currentLocation.key === location.key) window.location.reload();
    }
  }

  onRenderComplete(route, location) {
    this.restoreScroll();
  }

  updateScrollPostion() {
    if (this.currentLocation) {
      this.scrollPositionsHistory[this.currentLocation.pathname] = {
        scrollX: window.pageXOffset,
        scrollY: window.pageYOffset,
      };
      if (history.action === 'PUSH') {
        delete this.scrollPositionsHistory[location.pathname];
      }
    }
  }

  restoreScroll() {
    let scrollX = 0;
    let scrollY = 0;
    let position = this.scrollPositionsHistory[location.pathname];
    if (position) {
      scrollX = position.scrollX;
      scrollY = position.scrollY;
    } else {
      let targetHash = location.hash.substr(1);
      if (targetHash) {
        let target = document.getElementById(targetHash);
        if (target) scrollY = window.pageYOffset + target.getBoundingClientRect().top;
      }
    }
    window.scrollTo(scrollX, scrollY);
  }

  hotReloading() {
    if (module.hot) {
      module.hot.accept('../routes', () => {
        routes = require('../routes').default;
        if (this.appInstance) {
          try {
            deepForceUpdate(this.appInstance);
          } catch (err) {
            this.handleError(err, `Hot Update Error: ${err.message}`);
          }
        }
        onLocationChange(currentLocation);
      });
    }
  }

  handleError(err, title) {
    console.error(err);
    this.appInstance = null;
    document.title = title;
    ReactDOM.render(<RedboxReact error={err} />, this.container);
  }
}

new Client();
