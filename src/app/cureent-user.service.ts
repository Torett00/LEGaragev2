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

  setCurentUser(){
    if(localStorage.getItem('token')){
      this.currentUser$.next({ id:'1', name:'foo'});

    }else{
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
