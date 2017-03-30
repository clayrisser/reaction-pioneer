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
        <script src="main.js"></script>
      </body>
    </html>)
  }
}

Html.propTypes = {
  script: PropTypes.string,
  children: PropTypes.string
};

export default Html;
