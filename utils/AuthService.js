import React from 'react'

export default class AuthService {
  constructor(clientId, domain) {
    // Configure Auth0
    this.clientId = clientId;
    this.domain = domain;

    this.auth0 = new window.auth0.WebAuth({
      domain: domain,
      clientID: clientId,
      scope: 'openid profile',
      responseType: 'token id_token',
      redirectUri: 'http://localhost:3000/callback'
    });

    // binds login functions to keep this context
    this.login = this.login.bind(this);
  }

  parseHash(callback) {
    this.auth0.parseHash((err, result) => {
      if(err) {
        console.log(err);
        callback(false);
        this.logout();
        return;
      }

      this.setToken(result.accessToken);
      callback(true);
    });
  }

  login() {    
    this.auth0.authorize();
  }

  loggedIn(){
    // Checks if there is a saved token and it's still valid
    return !!this.getToken();
  }

  setToken(accessToken){
    // Saves user token to localStorage
    localStorage.setItem('accessToken', accessToken);
  }

  getToken(){
    // Retrieves the user token from localStorage
    return localStorage.getItem('accessToken');
  }

  logout(){
    // Clear user token from localStorage
    localStorage.removeItem('accessToken');
  }
}
