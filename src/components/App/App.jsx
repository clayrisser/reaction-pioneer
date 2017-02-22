/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, {Component, PropTypes, cloneElement, Children} from 'react';
import fonts from '../../styles/fonts/fonts.scss?root=./src/styles/fonts/';
import animateCss from 'animate.css/animate.css?root=./node_modules/animate.css/';
import fontAwesome from '../../styles/font-awesome/font-awesome.scss?root=./src/styles/font-awesome/';
import flexboxgrid from '../../styles/flexboxgrid/flexboxgrid.scss?root=./src/styles/flexboxgrid/';
import splash from '../../styles/splash/splash.scss?root=./src/styles/splash/';
import _ from 'lodash';
import {options} from '../../config';
import Header from '../Header';
import Footer from '../Footer';

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  store: PropTypes.shape({
    subscribe: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    getState: PropTypes.func.isRequired
  }).isRequired,
  getHistory: PropTypes.func.isRequired,
  muiTheme: React.PropTypes.object.isRequired
};

/**
 * The top-level React component setting context (global) variables
 * that can be accessed from all the child components.
 *
 * https://facebook.github.io/react/docs/context.html
 *
 * Usage example:
 *
 *   const context = {
 *     history: createBrowserHistory(),
 *     store: createStore(),
 *   };
 *
 *   ReactDOM.render(<App context={context}><HomePage /></App>, container);
 */
class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    children: PropTypes.element.isRequired
  };

  static childContextTypes = ContextType;

  getChildContext() {
    return this.props.context;
  }

  componentWillMount() {
    const {insertCss} = this.props.context;
    this.removeFonts = insertCss(fonts);
    this.removeAnimateCss = insertCss(animateCss);
    this.removeFontAwesome = insertCss(fontAwesome);
    this.removeFlexboxgrid = insertCss(flexboxgrid);
    this.removeSplash = insertCss(splash);
  }

  componentWillUnmount() {
    this.removeFonts();
    this.removeAnimateCss();
    this.removeFontAwesome();
    this.removeFlexboxgrid();
    this.removeSplash();
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return (<div>
      <Header />
      {cloneElement(Children.only(this.props.children), {})}
      <Footer />
    </div>) ;
  }
}

export default App;
