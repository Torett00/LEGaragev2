import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, from } from 'rxjs';
import { Auth, signOut } from '@angular/fire/auth';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  authService=inject(AuthService);
  firebaseAuth=inject(Auth);

  


  logout(): Observable<void>{
    const promise=signOut(this.firebaseAuth);
  
     return from(promise);
}
}
