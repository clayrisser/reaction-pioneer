/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

/* eslint-disable max-len */

export default {
  title: 'Reaction'
};

export const title = 'Reaction';
export const port = process.env.PORT || 3000;
export const host = process.env.WEBSITE_HOSTNAME || `localhost:${port}`;

export const analytics = {
  google: {
    trackingId: process.env.GOOGLE_TRACKING_ID || 'UA-85896114-1'
  }
};
