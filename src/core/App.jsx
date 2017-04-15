import React, { Children, Component, PropTypes, cloneElement } from 'react';
import { loadStyles, unmountStyles } from './styles';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import muiTheme from '../styles/muiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const contextTypes = {
  insertCss: PropTypes.func.isRequired,
  store: PropTypes.object.isRequired
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

  getChildContext() {
    return this.props.context;
  }

  renderChildren() {
    return cloneElement(Children.only(this.props.children), {});
  }

  render() {
    return (<div style={{height: '100%'}}>
      <MuiThemeProvider muiTheme={getMuiTheme(muiTheme)}>
        {this.renderChildren()}
      </MuiThemeProvider>
    </div>);
  }
}

export default App;
