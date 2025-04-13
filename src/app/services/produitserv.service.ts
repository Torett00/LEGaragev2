import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDocs, query, where } from '@angular/fire/firestore';
import { Iproduit } from '../interfaces/iproduit';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitservService {

  constructor(private firestore:Firestore){}


  getallproduct():Observable<Iproduit[]>{
    let notref=collection(this.firestore,'Products')
    return collectionData(notref,{idField:'id'}) as Observable<Iproduit[]>
  }

  delete(key:string){
    const categorieDocRef = doc(this.firestore, 'Products', key); // Get the reference to the document by its ID
  return deleteDoc(categorieDocRef); // Delete the document from Firestore
  }

  async addcat(cat: Iproduit): Promise<void> {
    // Check if the category already exists
    const categoryExists = await this.checkIfproductExists(cat.name);
  
    if (categoryExists) {
      console.log('Category with this name already exists!');
      return; // Don't proceed if category exists
    }
  
    // Add the new category to Firestore
    try {
      const categoryRef = await addDoc(collection(this.firestore, 'Products'), cat);
      console.log('produit added successfully with ID:', categoryRef.id);
    } catch (error) {
      console.error('Error adding produit:', error);
    }
  }


  async checkIfproductExists(name: string): Promise<boolean> {
    const produitsRef = collection(this.firestore, 'Products');
    const q = query(produitsRef, where('name', '==', name)); // Check for matching category name
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty; // Return true if a category with that name exists
  }
  async addproduit(cat: Iproduit): Promise<void> {
    // Check if the category already exists
    const categoryExists = await this.checkIfproductExists(cat.name);
  
    if (categoryExists) {
      console.log('Category with this name already exists!');
      return; // Don't proceed if category exists
    }
  
    // Add the new category to Firestore
    try {
      const categoryRef = await addDoc(collection(this.firestore, 'Products'), cat);
      console.log('Category added successfully with ID:', categoryRef.id);
    } catch (error) {
      console.error('Error adding category:', error);
    }
  }
}
