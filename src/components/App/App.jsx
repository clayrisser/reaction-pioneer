import React, { PropTypes, Component, Children } from 'react';
import rootStyle from '../../styles/root/root.scss?root=./src/styles/root/';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentWillMount() {
    let insertCss = this.props.context.insertCss;
    this.removeRootStyle = insertCss(rootStyle);
  }

  componentWillUnmount() {
    this.removeRootStyle();
  }

  renderChildren() {
    return Children.only(this.props.children);
  }

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (<div>
      {this.renderChildren()}
    </div>);
  }
}

const contextTypes = {
  insertCss: PropTypes.func.isRequired,
  store: PropTypes.object
}

App.propTypes = {
  context: PropTypes.shape(contextTypes),
  children: PropTypes.element.isRequired
};

App.childContextTypes = contextTypes;

export default App;
