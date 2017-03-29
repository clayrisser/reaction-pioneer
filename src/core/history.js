import { createBrowserHistory } from 'history';

export default process.env.BROWSER && createBrowserHistory();
