import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ProduitComponent } from './produit/produit.component';


export const routes: Routes = [
    { path: '' ,redirectTo:'home', pathMatch:'full' },
    { path: 'home' , component: HomeComponent},
       { path: 'register',component: RegisterComponent,
      },

      {
        path: 'login',
        component: LoginComponent,
      },
      
      {
        path: 'dash',
        component: DashComponent,
      },
      {
        path: 'cat',
        component: CategorieComponent,
      },  
      {
        path: 'prod',
        component: ProduitComponent,
      },
];
