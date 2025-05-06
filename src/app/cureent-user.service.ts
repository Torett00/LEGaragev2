import { Injectable, inject } from '@angular/core';
import { Auth, User, authState } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ActivatedRouteSnapshot, MaybeAsync, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CureentUserService {

  currentUser$=new BehaviorSubject<
  {id:string, name:string} | null | undefined
  >(undefined);

  setCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      // console.log("they are a user to set");
      this.currentUser$.next({ id: '1', name: 'foo' }); // Normally you'd decode the token or fetch user data here
    } else {
      // console.log("nuser are null");
      this.currentUser$.next(null);
    }
  }
 
  // setcurrentuserisnNull(){
  //   this.currentUser$.next(null);
  // }
  // getcurrentuser(){
  //   return this.currentUser$;
  // }
 


  
}
