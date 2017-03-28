import express from 'express';
import config from './config';

const app = express();

app.get('*', (req, res) => {
  res.send('Hello, reaction!');
});

app.listen(config.environment.port, () => {
  console.log(`The server is running at http://localhost:${config.environment.port}/`);
});
