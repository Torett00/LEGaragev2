import { inject, Injectable, signal } from "@angular/core";
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateCurrentUser, updateProfile, User, user } from "@angular/fire/auth";
import { from, Observable, switchMap } from "rxjs";
import { UserInterface } from "./user.interface";
import { CureentUserService } from "./cureent-user.service";

@Injectable({
    providedIn:'root'
})
export class AuthService{

    firebaseAuth=inject(Auth)

    user$=user(this.firebaseAuth);
    constructor(private cureentuserser:CureentUserService){
        this.cureentuserser.setCurrentUser();

    }
    currentUsersig=signal<UserInterface | null | undefined>(undefined)
   
    isLoggedIn(): boolean {
        const user = this.firebaseAuth.currentUser;
        // console.log(user,"sss")
        return true;
      }
    // get isLoggedIn(): boolean {
    //     const token = JSON.parse(localStorage.getItem('Token') || '{}');
    //     return (token !== null) ? true : false;
    //   }
    register(email:string, username:string , password:string):Observable<void>{

        const promise=createUserWithEmailAndPassword(this.firebaseAuth,email,password).then((response)=>
        updateProfile(response.user,{displayName:username}),);

        return from(promise);
    }

    // login(email:string, password:string):Observable<void>{

    //     const promise=signInWithEmailAndPassword(this.firebaseAuth,email,password).then(()=>{});

    //     return from(promise);
        
    // }

    login(email: string, password: string): Observable<string> {
        return from(
          signInWithEmailAndPassword(this.firebaseAuth, email, password)
        ).pipe(
          switchMap((userCredential) => 
            from(userCredential.user.getIdToken()) // Extract token
          )
        );
      }
    logout(): Observable<void>{
       const promise=signOut(this.firebaseAuth);
       localStorage.removeItem('token'); 
       this.cureentuserser.setCurrentUser(); 
      //  console.log('token are romoved');
        // this.cureentuserser.setcurrentuserisnNull();
        return from(promise);
}

    }
