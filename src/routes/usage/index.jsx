/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Page from '../../components/Page';

const title = 'Usage'

export default {
  path: '/usage',
  action() {
    return new Promise((resolve, reject) => {
      resolve(require('./usage.md'));
    }).then(function(data) {
      return {
        title: title,
        component: <Page title={title} html={data.html} />
      };
    });
  }
};
