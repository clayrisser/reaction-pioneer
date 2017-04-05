/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Home.scss';
import cx from 'classnames';
import Link from '../../components/Link';

class Home extends Component {
  render() {
    return (<Layout>
      <div className={s.root}>
        <h1>Home</h1>
        I am the home page
      </div>
    </Layout>);
  }
}

export default withStyles(s)(Home);
