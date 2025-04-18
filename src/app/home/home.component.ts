import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { Observable, from } from 'rxjs';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CategorieserService } from '../services/categorieser.service';
import { ProduitservService } from '../services/produitserv.service';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { CureentUserService } from '../cureent-user.service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  authService=inject(AuthService);
  firebaseAuth=inject(Auth);
  catgeoriges:CategorieInterface[]=[];

  
constructor(private router:Router,private servicecat:CategorieserService,private serviceprod:ProduitservService,private servicecurentuser:CureentUserService) {
  
}
  ngOnInit(): void {
    this.servicecat.getallcat().subscribe((res:CategorieInterface[])=>{
      console.log(res)
      this.catgeoriges=res;
    })
  }
navigateToLogin(): void {
  this.router.navigate(['/login']);  // Redirect to 'target' route
}

//   logout(): Observable<void>{
//     const promise=signOut(this.firebaseAuth);
//     this.navigateToLogin();
//      return from(promise);
// }

logout(): Observable<void>{
  const promise=signOut(this.firebaseAuth);
  localStorage.removeItem('token'); 
  this.servicecurentuser.setCurrentUser(); 
  console.log('token are romoved');
   // this.cureentuserser.setcurrentuserisnNull();
   return from(promise);
}
}
