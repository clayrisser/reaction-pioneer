/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Page.css';
import Layout from '../Layout';

class Page extends Component {
  render() {
    return (<Layout>
      <div className={s.root}>
        <div className={s.container}>
          <h1>{this.props.title}</h1>
          <div dangerouslySetInnerHTML={{__html: this.props.html}} />
        </div>
      </div>
    </Layout>);
  }
}
Page.propTypes = {
  html: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default withStyles(s)(Page);
