import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { AuthService } from "app/services/auth.service";

@Injectable()
export class AuthGuard implements CanActivate
{
    constructor(private authService: AuthService, private router: Router) {}

    /**
     * Checks if user is logged in. Prevents unwanted behavior by 
     * redirecting to login page if the user is not logged in.
     * 
     * Useful for preventing access to places where user must
     * be logged in.
     * 
     * @returns {boolean} true if logged in, false if not
     */
    canActivate()
    {
        if (this.authService.loggedIn())
        {
            return true;
        }
        this.router.navigate(["/login"]);
        return false;
    }
}