import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { CategorieComponent } from './categorie/categorie.component';
import { ProduitComponent } from './produit/produit.component';
import { AuthGuardService } from './auth-guard.service';
import { UserAuthInterfaceComponent } from './user-auth-interface/user-auth-interface.component';


export const routes: Routes = [
    { path: '' ,redirectTo:'home', pathMatch:'full' },
    { path: 'home' , component: HomeComponent},
       { path: 'register',component: RegisterComponent,
       canActivate: [AuthGuardService],
      },

      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'Users',
        component: UserAuthInterfaceComponent,
      },
      
      {
        path: 'dash',
        component: DashComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'cat',
        component: CategorieComponent,
        canActivate: [AuthGuardService],
      },  
      {
        path: 'prod',
        component: ProduitComponent,
        canActivate: [AuthGuardService],
      },
    
];
