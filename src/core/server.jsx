import 'babel-polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import UniversalRouter from 'universal-router';
import express from 'express';
import path from 'path';
import App from '../components/App';
import Html from './Html';
import config from '../config';
import logger from '../../tools/logger';
import routes from '../routes';
import configureStore from '../redux/configureStore';
import assets from './assets';

const app = express();

const context = {
  store: configureStore()
};

app.use(express.static(path.join(__dirname, 'public')));

app.get('*', async (req, res) => {
  try {
    const router = new UniversalRouter(routes);
    const route = await router.resolve({
      path: req.path,
      query: req.query
    });
    if (route.redirect) {
      res.redirect(route.status || 302, route.redirect);
      return;
    }
    const children = ReactDOMServer.renderToString(<App context={context}>{route.component}</App>);
    const html = ReactDOMServer.renderToStaticMarkup(<Html client={assets.main.js}>
      {children}
    </Html>);
    return res.send(`<!doctype html>${html}`);
  } catch (err) {
    return logger.error(err);
  }
});

app.listen(config.environment.port, () => {
  console.log(`The server is running at http://localhost:${config.environment.port}/`);
});
