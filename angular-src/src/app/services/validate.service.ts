import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService 
{
  constructor() {}

  /**
   * Making sure a created user has all necessary values defined
   * 
   * @param {User} user - A UserSchema object to be validated
   * 
   * @returns {boolean} - True if all values are defined, false otherwise
   */
  validateRegister(user)
  {
    if (!user.name || !user.email || !user.username || !user.password)
    {
      return false;
    }
    return true;
  }

/**
 * Validates an email address using regex.
 * 
 * @param {string} email - An email address to be validated.
 * 
 * @returns {boolean} - Returns true if the email is valid according to the regex,
 * and false if it is invalid.
 * 
 * @source The regex was received from StackOverflow:
 * https://stackoverflow.com/questions/46155/how-can-i-validate-an-email-address-in-javascript
 */

  validateEmail(email)
  {
    const regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return regex.test(email);
  }
}
