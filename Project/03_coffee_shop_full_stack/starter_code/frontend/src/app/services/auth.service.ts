import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

import { environment } from '../../environments/environment';

const JWTS_LOCAL_KEY = 'JWTS_LOCAL_KEY';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Correctly get properties from the 'auth' object in environment.ts
  domain = environment.auth.domain;
  audience = environment.auth.audience;
  clientId = environment.auth.clientId;
  callbackURL = environment.auth.callbackURL;

  token: string;
  payload: any;

  constructor() { }

  build_login_link(callbackPath = '') {
    let link = 'https://';
    link += this.domain;
    link += '/authorize?';
    link += 'audience=' + this.audience + '&';
    link += 'response_type=token&';
    link += 'client_id=' + this.clientId + '&';
    link += 'redirect_uri=' + this.callbackURL + callbackPath;
    return link;
  }

  check_token_fragment() {
    const fragment = window.location.hash.substr(1).split('&')[0].split('=');
    if ( fragment[0] === 'access_token' ) {
      this.token = fragment[1];
      this.set_jwt();
    }
  }

  set_jwt() {
    localStorage.setItem(JWTS_LOCAL_KEY, this.token);
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  load_jwts() {
    this.token = localStorage.getItem(JWTS_LOCAL_KEY) || null;
    if (this.token) {
      this.decodeJWT(this.token);
    }
  }

  activeJWT() {
    return this.token;
  }

  decodeJWT(token: string) {
    const jwtservice = new JwtHelperService();
    this.payload = jwtservice.decodeToken(token);
    return this.payload;
  }

  logout() {
    this.token = '';
    this.payload = null;
    localStorage.removeItem(JWTS_LOCAL_KEY);

    const logoutUrl = `https://` +
                      `${this.domain}/v2/logout?` +
                      `client_id=${this.clientId}&` +
                      `returnTo=${encodeURIComponent('http://localhost:8100')}`;

    window.location.href = logoutUrl;
  }

  can(permission: string) {
    return this.payload && this.payload.permissions && this.payload.permissions.length && this.payload.permissions.indexOf(permission) >= 0;
  }
}
