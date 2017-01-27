/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes, Children} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Layout.css';
import Footer from '../Footer';

class Layout extends Component {

  componentDidMount() {
    window.addEventListener('scroll', function() {
      this.scrolling();
    }.bind(this));
    window.addEventListener('resize', function() {
      this.scrolling();
    }.bind(this));
  }

  render() {
    return (<div className={s.root}>
      <div id="content-main">
        {Children.only(this.props.children)}
      </div>
      <div id="footer-main">
        <Footer />
      </div>
    </div>);
  }

  scrolling() {
    if (window.scrollY > 0) {
      this.stickHeader(true);
    } else {
      this.stickHeader(false);
    }
  }

  stickHeader(yes) {
    var header = document.querySelector('#header-main nav');
    var content = document.getElementById('content-main');
    if (yes) {
      header.style.position = 'fixed';
      content.style.marginTop = header.offsetHeight + 'px';
      header.style.marginTop = '-' + header.offsetHeight + 'px';
    } else {
      header.style.position = 'relative';
      content.style.marginTop = '0px';
      header.style.marginTop = '0px';
    }
  }
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};

export default withStyles(s)(Layout);
