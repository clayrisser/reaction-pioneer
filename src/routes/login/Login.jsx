import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Login.css';
import cx from 'classnames';
import Link from '../../components/Link';
import RaisedButton from 'material-ui/RaisedButton';
import fetch from '../../core/fetch';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      token: false
    };
  }

  componentDidMount() {
    this.server = 'http://localhost:1337';
    this.getToken().then((body) => {
      if (body.package && body.package.token) this.setState({token: body.package.token});
    }).catch((err) => {
      console.log(err);
    });
  }

  render() {
    return (<Layout>
      <div className={s.root}>
        <h1>{this.props.title}</h1>
        <RaisedButton label="GitHub Login" onClick={this.loginWithProvider.bind(this, 'github')} primary={true} />
      </div>
    </Layout>);
  }

  loginWithProvider(provider) {
    return new Promise((resolve, reject) => {
      if (!this.state.token) {
        var authWindow = window.open(this.server + '/auth/provider/' + provider, '_blank');
        var interval = setInterval(() => {
          if (authWindow.closed) {
            clearInterval(interval);
            this.getToken().then((body) => {
              if (body.package && body.package.token) {
                this.setState({token: body.package.token});
                resolve(body.package.token);
              } else {
                reject(new Error(body.message));
              }
            });
          }
        }, 1000);
      } else {
        resolve(this.state.token)
      }
    }).then((token) => {
      return this.authenticated(token).then((body) => {
        if (!body.package.authenticated) return console.error(new Error(body.message));
          return console.log(body.package.user);
      });
    }).catch((err) => {
      console.error(err);
    });
  }

  authenticated(token) {
    return fetch(this.server + '/auth/authenticated', {
      headers: {
        Authorization: 'Bearer ' + token
      }
    }).then((response) => {
      return response.json();
    });
  }

  getToken() {
    return fetch(this.server + '/auth/get-token', {
      credentials: 'include'
    }).then((response) => {
      return response.json();
    });
  }
}

export default withStyles(s)(Login);
