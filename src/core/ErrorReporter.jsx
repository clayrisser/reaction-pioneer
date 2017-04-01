import React, { Component, PropTypes } from 'react';

class ErrorReporter extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    let err = this.props.error;
    if (process.env.NODE_ENV !== 'production') {
      let style = {
        root: {
          backgroundColor: '#CC0000',
          fontWeight: 'bold'
        },
        title: {
          fontFamily: 'sans-serif',
          padding: '10px',
          fontSize: '16px',
          lineHeight: '1.2',
          color: '#FFFFFF'
        },
        stack: {
          color: '#FFFFFF'
        }
      };
      return (<div style={style.root}>
        <div style={style.title}>{`${err.name}: ${err.message}`}</div>
        <div style={style.stack}>{err.stack}</div>
      </div>);
    }
    return (<div>
      <h1>{this.props.title}</h1>
      <p>Sorry, a critical error occurred on this page.</p>
    </div>);
  }
}

ErrorReporter.propTypes = {
  error: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

export default ErrorReporter;
