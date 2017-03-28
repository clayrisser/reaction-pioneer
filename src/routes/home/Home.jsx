import React, { PropTypes, Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (<div>
      <h1>{this.props.title}</h1>
      <p>I am home</p>
    </div>);
  }
}

Home.propType = {
  title: PropTypes.string.isRequired
}

export default Home;
