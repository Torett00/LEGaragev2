import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategorieserService {

constructor(private firestore:Firestore){}
async addcat(cat: CategorieInterface): Promise<void> {
  // Check if the category already exists
  const categoryExists = await this.checkIfCategoryExists(cat.name);

  if (categoryExists) {
    console.log('Category with this name already exists!');
    return; // Don't proceed if category exists
  }

  // Add the new category to Firestore
  try {
    const categoryRef = await addDoc(collection(this.firestore, 'Categorie'), cat);
    console.log('Category added successfully with ID:', categoryRef.id);
  } catch (error) {
    console.error('Error adding category:', error);
  }
}
  getallcat():Observable<CategorieInterface[]>{
let notref=collection(this.firestore,'Categorie')
return collectionData(notref,{idField:'id'}) as Observable<CategorieInterface[]>
  }
  delete(key:string){
    const categorieDocRef = doc(this.firestore, 'Categorie', key); // Get the reference to the document by its ID
  return deleteDoc(categorieDocRef); // Delete the document from Firestore
  }

  async checkIfCategoryExists(name: string): Promise<boolean> {
    const categoriesRef = collection(this.firestore, 'Categorie');
    const q = query(categoriesRef, where('name', '==', name)); // Check for matching category name
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if a category with that name exists
  }
}
