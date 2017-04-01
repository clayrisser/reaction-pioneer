import React, { PropTypes, Component } from 'react';
import Link from '../../core/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (<div className={s.root}>
      <h1>{this.props.title}</h1>
      <p>ooo i am homes</p>
      <Link to="/boo">hi</Link>
    </div>);
  }
}

Home.propTypes = {
  title: PropTypes.string.isRequired
}

export default withStyles(s)(Home);
