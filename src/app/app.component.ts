import { Component, OnInit, inject } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';
import { AuthService } from './auth.service';
import { CureentUserService } from './cureent-user.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  
  title = 'LEGARAGEEE';
authService=inject(AuthService)
  constructor (private firestore: Firestore,private currentUser:CureentUserService){
  

  }

  public ngOnInit(): void {
 setTimeout(()=>{
  this.currentUser.setCurrentUser();
 },2000);


 console.log(this.currentUser,'cureentuser');

      const testCollection=collection(this.firestore,'test');
      // addDoc(testCollection,{text:"i hate firebase"});
      this.authService.user$.subscribe((user)=> {
        if (user){
          console.log('in th condition check')
          this.authService.currentUsersig.set({
            email:user.email!,
            username:user.displayName!,
          })
        }else{
          this.authService.currentUsersig.set(null);
        }
        console.log(this.authService.currentUsersig())
      });
  }
}
