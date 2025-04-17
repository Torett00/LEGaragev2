import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable, filter, map } from "rxjs";
import { CureentUserService } from './cureent-user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

   
   

  constructor(private authService: AuthService, private router: Router,private cureentuserser:CureentUserService) {}
  canActivate(): Observable<boolean>  {



    return this.cureentuserser.currentUser$.pipe(
      filter((cureentuser)=>cureentuser !==undefined),
      map((cureentuser)=>{
        if(cureentuser==null){
          this.router.navigateByUrl('login');
          console.log(false);
          return false;
        }
        console.log(true);
        return true;
      }

      )
    )
    
  }
}
