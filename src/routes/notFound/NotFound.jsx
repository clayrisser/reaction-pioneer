import React, { PropTypes, Component } from 'react';

class NotFound extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (<div>
      <h1>Page Not Found</h1>
      <p>Oooops, I couldn't find the page you were looking for</p>
    </div>);
  }
}

NotFound.propType = {
  title: PropTypes.string.isRequired
}

export default NotFound;
