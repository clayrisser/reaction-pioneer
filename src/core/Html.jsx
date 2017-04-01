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
        {this.props.scripts.map((script) => (<script key={script} src={script} />))}
        <style type="text/css">${[...this.props.css].join('')}</style>
      </body>
    </html>)
  }
}

Html.defaultProps = {
  scripts: [],
  children: '<div></div>'
};

Html.propTypes = {
  scripts: PropTypes.array,
  children: PropTypes.string
};

export default Html;
