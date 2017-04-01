import React, { PropTypes, Component } from 'react';
import config from '../config';

class Html extends Component {
  static defaultProps = {
    scripts: [],
    children: '<div></div>'
  };
  static propTypes = {
    scripts: PropTypes.array,
    children: PropTypes.string
  };

  state = {};

  render() {
    let style = {
      padding: '0px',
      margin: '0px',
      height: '100%'
    };
    return (<html style={style}>
      <head>
        <meta charSet="utf-8" />
        <title>{config.title}</title>
      </head>
      <body style={style}>
        <div id="app" style={style} dangerouslySetInnerHTML={{__html: this.props.children}} />
        {this.props.scripts.map((script) => (<script key={script} src={script} />))}
        <style type="text/css">${[...this.props.css].join('')}</style>
      </body>
    </html>)
  }
}

export default Html;
