import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit 
{

  constructor
  (
    private authService: AuthService,
    private router: Router,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
  }

  /**
   * Calling the logout function, notifying with flashmessage and navigating to login page
   * @returns {boolean} false
   */
  onLogoutClick()
  {
    this.authService.logout();
    this.flashMessage.show("You have been logged out", { cssClass: "alert-success", timeout: 3000 });
    this.router.navigate(["/login"]);
    return false;
  }
}
