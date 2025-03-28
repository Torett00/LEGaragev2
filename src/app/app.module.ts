import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

@NgModule({
    declarations: [
      AppComponent,
      RegisterComponent,
      LoginComponent
    ],
    imports: [
      BrowserModule,
      FormsModule ,
      ReactiveFormsModule  
    ],
    providers: [], // Provide ConfigService here
    bootstrap: [AppComponent]
  })
  export class AppModule { }