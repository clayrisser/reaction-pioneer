import React, { PropTypes, Component } from 'react';
import Link from '../../core/Link';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Home.scss';
import Layout from '../../components/Layout';

class Home extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
  }

  state = {};

  render() {
    return (<div className={s.root}>
      <Layout>
        I am home
      </Layout>
    </div>);
  }
}

export default withStyles(s)(Home);
