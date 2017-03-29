import React, { PropTypes, Component } from 'react';
import config from '../config';

class Html extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (<html>
      <head>
        <meta charSet="utf-8" />
        <title>{config.title}</title>
      </head>
      <body>
        <div id="app" dangerouslySetInnerHTML={{__html: this.props.children}} />
        <script src="./client.js" />
      </body>
    </html>)
  }
}

export default Html;
