import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-auth-interface',
  imports: [],
  templateUrl: './user-auth-interface.component.html',
  styleUrl: './user-auth-interface.component.css'
})
export class UserAuthInterfaceComponent {
  users: any[] = [];
  constructor(private userserve:UsersService,private router:Router){}
  ngOnInit(): void {
    this.fetchAllUsers();
  }
  fetchAllUsers(): void {
    this.userserve.getAllUsersWithErrorHandling().subscribe({
      next: (users) => {
        this.users = users;
        console.log('Fetched users:', users);
      },
      error: (err) => {
        console.error('Error fetching users:', err);
      }
    });
  }
}
