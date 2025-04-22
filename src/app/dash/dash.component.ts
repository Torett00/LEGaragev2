import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Firestore ,doc,addDoc, collection, collectionData} from '@angular/fire/firestore';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { AngularFirestore, AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { CommonModule } from '@angular/common';
import { CategorieserService } from '../services/categorieser.service';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
import { Router } from '@angular/router';



Validators

@Component({
  selector: 'app-dash',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './dash.component.html',
  styleUrl: './dash.component.css'
})
export class DashComponent implements OnInit {

  catgeoriges:CategorieInterface[]=[];

  catobjaupdate: CategorieInterface={
    id:'',
    name:''
  }
  
  constructor(private servicecat:CategorieserService,private dialogRef : MatDialog,private router: Router) {}

  
  navigateToprod(): void {
    this.router.navigate(['/prod']);  // Redirect to 'target' route
  }
  navigateToHome(): void {
    this.router.navigate(['/home']);  // Redirect to 'target' route
  }
  navigateToProducts(categoryName: string) {
    this.router.navigate(['/cat'], { queryParams: { category: categoryName } });
    // or if you want to use route parameters:
    // this.router.navigate(['/products', categoryName]);
  }
 async openDialog(key:string){

    const cat: CategorieInterface | null = await this.servicecat.getCatById(key);

    if (cat) {
      console.log(cat.id,'ssssss');
      console.log("hello khaled hhh")
      this.dialogRef.open(PopupComponent, {
        data: {
          categorie: {
            name: cat.name,
            id: cat.id,
            
          }
        
      }});
      console.log("hello khaled hhh2");
    } else {
      console.warn('Category not found for ID:', key);
    }
  }
  ngOnInit(): void {
    // this.getallcategore();

    this.servicecat.getallcat().subscribe((res:CategorieInterface[])=>{
      console.log(res)
      this.catgeoriges=res;
    })
   
}

  // constructor(private firestore: AngularFirestore) {}
  
  catobj: CategorieInterface={
    id:'',
    name:''
  }
  
  createCategorieForm=new FormGroup( {
    name: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]})
  } );


 addCategor(){
  const {value}= this.createCategorieForm
  
  if (this.createCategorieForm.value.name !== undefined )  {
    this.catobj.name = this.createCategorieForm.value.name;
   
  } else {
    this.catobj.name = ''; // Or another default value
  }
  
  this.servicecat.addcat(this.catobj);
  
 }

 onDeleteCategorie(id:string){
this.servicecat.delete(id);
  }
  showSuccessMessage = false;
  successMessage = '';
  showNameRequiredError = false;
name2:string='';


  onFormSubmit(){
    // console.log(this.createCategorieForm.value.name);
   
 
    const categoryName = this.createCategorieForm.value.name; // Get the category name from the form

    // console.log('Category Name:', categoryName); // Log the category name (optional)

    if (categoryName ) {
      const categoryData = { name: categoryName };
      this.addCategor();
      this.showNameRequiredError = false; 
      // Show success message
      this.showSuccessMessage = true;
      this.successMessage = 'Category added successfully!';
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
      this.createCategorieForm.reset();
      // Call the addCategory method and handle the result
      console.log('Category is there!',categoryData);
    } else {
      this.showNameRequiredError = true; 
      console.log('Category name is required!');
    }

  }


  

}
