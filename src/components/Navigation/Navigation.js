/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import cx from 'classnames';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Navigation.css';
import Link from '../Link';

function Navigation() {
    return (<div className={s.root}>
        <li className="nav-item">
            <Link className="nav-link" to="/about">About</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/contact">Contact</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/login">Log in</Link>
        </li>
        <li className="nav-item">
            <Link className="nav-link" to="/register">Sign up</Link>
        </li>
    </div>
  );
}

export default withStyles(s)(Navigation);
