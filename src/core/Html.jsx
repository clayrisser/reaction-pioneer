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
      app: {
        padding: '0px',
        margin: '0px',
        height: '100%',
        width: '100%'
      },
      body: {
        padding: '0px',
        margin: '0px',
        height: '100%',
        width: '100%'
      },
      html: {
        padding: '0px',
        margin: '0px',
        height: '100%',
        width: '100%',
        position: 'fixed'
      }
    };
    return (<html style={style.html}>
      <head>
        <meta charSet="utf-8" />
        <title>{config.title}</title>
      </head>
      <body style={style.body}>
        <div id="app" style={style.app} dangerouslySetInnerHTML={{__html: this.props.children}} />
        {this.props.scripts.map((script) => (<script key={script} src={script} />))}
        <style type="text/css">${[...this.props.css].join('')}</style>
      </body>
    </html>)
  }
}

export default Html;
