import React, {Component, PropTypes} from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Layout from '../../components/Layout';
import s from './Login.css';
import cx from 'classnames';
import Link from '../../components/Link';
import RaisedButton from 'material-ui/RaisedButton';
import fetch from '../../core/fetch';

class Login extends Component {
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
      var authWindow = window.open(server + '/auth/provider/' + provider, '_blank');
      var interval = setInterval(() => {
        if (authWindow.closed) {
          clearInterval(interval);
          isAuthorize().then((authorized) => {
            if (authorized) {
              resolve(true);
            } else {
              reject(new Error('Failed to login'));
            }
          }).catch((err) => {
            reject(err);
          });
        }
      }, 1000);
    });
  }

  isAuthorized() {
    return fetch(server + '/auth/authorized')
      .then((response) => {
        return response.json();
      }).then((body) => {
        return body.authorized;
      });
  }
}

export default withStyles(s)(Login);
