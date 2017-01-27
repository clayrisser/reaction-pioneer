/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import cx from 'classnames';
import Link from '../Link';
import config from '../../config';

class Footer extends Component {
  render() {
    return (<div className={s.root}>
      I am the footer
    </div>);
  }
}

export default withStyles(s)(Footer);
