import React, { Component, PropTypes } from 'react';
import history from './history';

class Link extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    console.log('howdy');
  }

  render() {
    return (<a href={this.props.to} onClick={this.handleClick.bind(this)}>
      {this.props.children}
    </a>);
  }

  handleClick(e) {
    console.log('hello');
    /* e.preventDefault();*/
    /* return false;*/
    /* if (this.props.onClick) this.props.onClick(e);*/
    /* if (this.isModifiedEvent(e) || !this.isLeftClickEvent(e)) return;*/
    /* if (e.defaultPrevented === true) return;*/
    /* e.nativeEvent.stopImmediatePropagation();*/
    e.preventDefault();
    /* history.push(this.props.to);*/
  }

  isModifiedEvent(e) {
    return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
  }

  isLeftClickEvent(e) {
    return e.button === 0;
  }
}

Link.propTypes = {
  children: PropTypes.node,
  onClick: PropTypes.func,
  style: PropTypes.object,
  to: PropTypes.string.isRequired
};

export default Link;
