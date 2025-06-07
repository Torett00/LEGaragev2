import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private firestore:Firestore) {}
    // Method to get all users
    getAllUsersWithErrorHandling(): Observable<any[]> {
      try {
        const usersRef = collection(this.firestore, 'users');
        const usersQuery = query(usersRef);
        return collectionData(usersQuery, { idField: 'id' });
      } catch (error) {
        console.error('Error creating query:', error);
        throw error; // Or return a new Observable with error handling
      }
    }
}
