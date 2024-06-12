import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from "@angular/common/http"
import 'rxjs/add/operator/map';
import { tokenNotExpired } from "angular2-jwt"

@Injectable()

export class AuthService {
  authToken: any;
  user: any;

  constructor(private httpClient: HttpClient) { }

  /**
   * A POST request to /user/register in order to register the user
   * @param {User} user 
   */
  registerUser(user) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.httpClient.post('http://localhost:3000/users/register', user, {headers: headers})
  }

  /**
   * A POST request to /user/authenticate in order to authenticate the user
   * @param {User} user
   */
  authenticateUser(user) {
    let headers = new HttpHeaders({
      "Content-Type": "application/json"
    });
    return this.httpClient.post('http://localhost:3000/users/authenticate', user, {headers: headers})
  }

  /**
   * Fills in necessary headers and sends a GET request to /users/profile
   */
  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
     "Authorization": this.authToken,
      "Content-Type": "application/json"
    });

    return this.httpClient.get('http://localhost:3000/users/profile', {headers: headers})
  }

  /**
   * Fetching token from localstorage and assigning it to this.authToken
   */
  loadToken()
  {
    const token = localStorage.getItem("id_token");
    this.authToken = token;
  }

  /**
   * Using the JWT token expiration to determine whether the user
   * is logged in or not.
   * 
   * @returns {boolean} A boolean based on token expiration 
   * (true = not expired, for example)
   */
  loggedIn()
  {
    return tokenNotExpired("id_token");
  }

  /**
   * Setting the token and user JSON object (in string format) into the localstorage of
   * the browser.
   * 
   * @param {Any} token
   * @param {Any} user 
   * 
   * Conditions
   * ----------
   * Only executes after a login has been successful
   */
  storeUserData(token, user)
  {
    localStorage.setItem("id_token", token);
    localStorage.setItem("user", JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  /**
   * Setting the token and the user into null and wiping the localstorage.
   */
  logout()
  {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
