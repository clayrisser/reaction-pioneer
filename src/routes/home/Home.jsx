import React, { PropTypes, Component } from 'react';
import Link from '../../core/Link';

class Home extends Component {
  constructor(props, context) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div>
      <h1>{this.props.title}</h1>
      <p>I am home</p>
      <Link to="/boo">hi</Link>
    </div>);
  }
}

Home.propType = {
  title: PropTypes.string.isRequired
}

export default Home;
