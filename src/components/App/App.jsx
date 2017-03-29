import React, { PropTypes, Component, Children, cloneElement} from 'react';

class App extends Component {
  constructor() {
    super();
    this.state = {};
  }

  renderChildren() {
    return cloneElement(Children.only(this.props.children), {
      context: this.props.context
    });
  }

  render() {
    return (<div>
      {this.renderChildren()}
    </div>);
  }
}

export default App;
