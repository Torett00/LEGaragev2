import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';

@NgModule({
    declarations: [
      
      
    ],
    imports: [
      BrowserModule,
      FormsModule ,
      ReactiveFormsModule,
      AngularFirestoreModule,
      AngularFireDatabaseModule, 
      
    ],
    providers: [], // Provide ConfigService here
    bootstrap: []
  })
  export class AppModule { }