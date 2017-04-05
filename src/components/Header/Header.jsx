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
import s from './Header.css';
import cx from 'classnames';
import Link from '../Link';
import navigation from '../navigation';
import NoScript from 'react-noscript';
import AppBar from 'material-ui/AppBar';
import {Tabs, Tab} from 'material-ui/Tabs';
import Slider from 'material-ui/Slider';
import config from '../../config';
import history from '../../core/history';
import _ from 'lodash';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      mobile: false
    }
  }

  appBarNav() {
    return navigation.map((item) => {
      var goTo = (item) => {
        history.push(item.to);
      }
      return (
        <Tab key={item.label} label={item.label} className={s.tab} onActive={goTo.bind(this, item)} />
      );
    });
  }

  render() {
    return (<div className={s.root}>
      <AppBar>
        <div className={'col-md-2'}>
          <div className={cx('row', 'middle-md')} style={{height: '100%'}}>
            <div className={'col-md'}>
              <div className={'box'}>
                <h2 className={s.title}>{config.title}</h2>
              </div>
            </div>
          </div>
        </div>
        <Tabs className={cx(s.tabs, 'col-md-10')}>
          {this.appBarNav()}
        </Tabs>
      </AppBar>
      <NoScript>
        <div className={cx(s.noScript)}>
          <h5>
            Javacript not enabled
          </h5>
        </div>
      </NoScript>
    </div>);
  }
}

export default withStyles(s)(Header);
