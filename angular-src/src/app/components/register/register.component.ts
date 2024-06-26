import { Component, OnInit } from '@angular/core';
import { ValidateService } from 'app/services/validate.service';
import { AuthService } from 'app/services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit 
{
  name: String;
  username: String;
  email: String;
  password: String;

  constructor
  (
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  /**
   * When all the necessary registration information has been received, 
   * the information is validated and, if deemed valid, a brand new 
   * user account is registered.
   */
  onRegisterSubmit()
  {
    // Creating the User object
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    }

    // Making sure the required fields are filled
    if (!this.validateService.validateRegister(user))
    {
      this.flashMessage.show("Please fill in all the fields.", { cssClass: "alert-danger", timeout: 3000 });
      return false;
    }

    // Validating the email
    if (!this.validateService.validateEmail(user.email))
    {
      this.flashMessage.show("Please use a valid email address.", { cssClass: "alert-danger", timeout: 3000 });
      return false;
    }

    // Registering the user
    this.authService.registerUser(user).subscribe(data => 
    {
      if (!data["success"])
      {
        this.flashMessage.show("An error occurred when attempting to register.", { cssClass: "alert-danger", timeout: 3000 });
        this.router.navigate(["/register"]);
        return;
      }
      this.flashMessage.show("You are now registered and can log in.", { cssClass: "alert-success", timeout: 3000 });
      this.router.navigate(["/login"]);
    });
  }
}
