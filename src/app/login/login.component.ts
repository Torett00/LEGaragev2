import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CureentUserService } from '../cureent-user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  fb = inject(FormBuilder);
  http = inject(HttpClient);
  router = inject(Router);
  authService=inject(AuthService);
  form = this.fb.nonNullable.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  errorMessage: string | null = null;
constructor(private currentUserService:CureentUserService){

}
  onSubmit(): void {
    console.log('login is done ');
  
    const rawForm =this.form.getRawValue();
   this.authService
    .login(rawForm.email,rawForm.password)
    .subscribe(()=>{
      this.router.navigateByUrl('/home');
    })

    // this.authService.login(rawForm.email,rawForm.password).subscribe({
    //   next: (response) => {
    //     localStorage.setItem('token', response.token);
    //     this.currentUserService.setCurrentUser();
    //     this.router.navigate(['/dash']);
    //   },
    //   error: (error) => {
    //     // handle error
    //   }
    // });
  }
}
