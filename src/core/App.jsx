import React, { PropTypes, Component, Children } from 'react';
import { loadStyles, unmountStyles } from './styles';

const contextTypes = {
  insertCss: PropTypes.func.isRequired,
  store: PropTypes.object
}

class App extends Component {
  static propTypes = {
    context: PropTypes.shape(contextTypes).isRequired,
    children: PropTypes.element.isRequired
  };
  static childContextTypes = contextTypes;

  state = {};

  componentWillMount() {
    loadStyles(this.props.context.insertCss);
  }

  componentWillUnmount() {
    unmountStyles();
  }

  renderChildren() {
    return Children.only(this.props.children);
  }

  getChildContext() {
    return this.props.context;
  }

  render() {
    return (<div style={{height: '100%'}}>
      {this.renderChildren()}
    </div>);
  }
}

export default App;
