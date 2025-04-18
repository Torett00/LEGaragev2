import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, filter, map } from "rxjs";
import { CureentUserService } from './cureent-user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

   
   

  constructor(private authService: AuthService, private router: Router,private currentUserService:CureentUserService) {}
  canActivate(): Observable<boolean> {
    return this.currentUserService.currentUser$.pipe(
      filter((currentUser) => currentUser !== undefined), // wait until user is resolved (even if null)
      map((currentUser) => {
        if (!currentUser) {
          this.router.navigateByUrl('login');
          console.log(false);
          return false;
        }
        console.log(true);
        return true;
      })
    );
  }
}
