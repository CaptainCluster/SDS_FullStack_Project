import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit 
{

  username: String;
  password: String;

  constructor
  (
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  /**
   * Takes the username and password when trying to log in. Creates a new
   * const User object and attempts to authenticate with the information
   * stored in it.
   * 
   * @function onLoginSubmit
   */
  onLoginSubmit()
  {
    const user = {
      username: this.username,
      password: this.password
    }
    this.authService.authenticateUser(user).subscribe(data =>
    {
      if (!data["success"])
      {
        this.flashMessage.show(data["msg"], { cssClass: "alert-danger", timeout: 5000 });
        this.router.navigate(["login"]);
        return;
      }
      this.authService.storeUserData(data["token"], data["user"]);
      this.flashMessage.show("You are now logged in.", { cssClass: "alert-success", timeout: 5000 });
      this.router.navigate(["dashboard"]);
    });
  }
}
