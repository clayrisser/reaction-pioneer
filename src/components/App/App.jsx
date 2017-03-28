import React, { PropTypes, Component } from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (<div>
      {this.props.children}
    </div>);
  }
}

export default App;
