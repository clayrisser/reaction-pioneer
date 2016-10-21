/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-2016 Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { PropTypes } from 'react';
import bootstrap from 'bootstrap/dist/css/bootstrap.css?root=./node_modules/bootstrap/dist/'; // eslint-disable-line import/no-unresolved, max-len

const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
  store: PropTypes.shape({
      subscribe: PropTypes.func.isRequired,
      dispatch: PropTypes.func.isRequired,
      getState: PropTypes.func.isRequired
  }).isRequired
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
class App extends React.Component {

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
    this.removeBootstrap = insertCss(bootstrap);
  }

  componentWillUnmount() {
    this.removeBootstrap();
  }

  render() {
    // NOTE: If you need to add or modify header, footer etc. of the app,
    // please do that inside the Layout component.
    return React.cloneElement(React.Children.only(this.props.children), {});
  }

}

export default App;
