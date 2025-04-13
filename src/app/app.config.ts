import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { routes } from './app.routes';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { provideHttpClient } from '@angular/common/http';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabase } from '@angular/fire/compat/database';
const firebaseConfig = {
  apiKey: "AIzaSyBs6novT3RZb7Lb9AtQyX09s51dQvLVbaE",
  authDomain: "angularfire-demo-8e101.firebaseapp.com",
  projectId: "angularfire-demo-8e101",
  storageBucket: "angularfire-demo-8e101.firebasestorage.app",
  messagingSenderId: "553540769596",
  appId: "1:553540769596:web:5135e25de5cc60a1553039"
};
export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes),provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(()=>getStorage()),
    provideAuth(()=>getAuth()),
  
    

  ]
};
