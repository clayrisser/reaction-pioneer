/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';

function Header() {
    return (<div className={s.root}>
        <nav className="navbar navbar-dark bg-primary">
            <button className="navbar-toggler hidden-sm-up" type="button" data-toggle="collapse" data-target="#collapseEx2">
                <i className="fa fa-bars"></i>
            </button>
            <Link className="navbar-brand" to="/">Reaction</Link>
            <div className="container">
                <div className="collapse navbar-toggleable-xs" id="collapseEx2">
                    <ul className="nav navbar-nav">
                        <Navigation />
                    </ul>
                </div>
            </div>
        </nav>
    </div>);
}

export default withStyles(s)(Header);
