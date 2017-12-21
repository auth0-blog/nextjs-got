import React from 'react'
import settings from '../data/settings'
import AuthService from '../utils/AuthService'

export default class extends React.Component {

  componentDidMount() {
    this.auth = new AuthService(settings.clientId, settings.domain);
    this.auth.parseHash(() => {
        this.props.url.replaceTo('/');
    });
  }

  render () {
    return <script src="https://cdn.auth0.com/js/auth0/9.0.0/auth0.min.js"></script>;
  }
}
