import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Iproduit } from '../interfaces/iproduit';
import { ProduitservService } from '../services/produitserv.service';
import { CommonModule } from '@angular/common';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { CategorieserService } from '../services/categorieser.service';
import { CategorieComponent } from "../categorie/categorie.component";
import { Router } from '@angular/router';
import { PopupProductUpdateComponent } from '../popup-product-update/popup-product-update.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-produit',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './produit.component.html',
  styleUrl: './produit.component.css'
})
export class ProduitComponent implements OnInit {
  catgeoriges:CategorieInterface[]=[];


  constructor(private serviceprod:ProduitservService,private servicecat:CategorieserService,private router:Router,private dialogRef : MatDialog){}
  products:Iproduit[]=[];

  navigateTodash(): void {
    this.router.navigate(['/dash']);  // Redirect to 'target' route
  }
  navigateToHome(): void {
    this.router.navigate(['/home']);  // Redirect to 'target' route
  }

  async openDialog(key:string){

    const cat: Iproduit | null = await this.serviceprod.getCatById(key);

    if (cat) {
      console.log(cat.categorie_name,'categorie name');
    
      this.dialogRef.open(PopupProductUpdateComponent, {
        data: {
          product: {
            name: cat.name,
            id: cat.id,
            prix:cat.prix,
            categorie_name:cat.categorie_name,
            description:cat.description,
            
          }
        
      }});
      
    } else {
      console.warn('Product not found for ID:', key);
    }
  }
  ngOnInit(): void {
    // this.getallcategore();

    this.serviceprod.getallproduct().subscribe((res:Iproduit[])=>{
      // console.log(res)
      this.products =res;
    })
    this.servicecat.getallcat().subscribe((res2:CategorieInterface[])=>{
      // console.log(res2)
      this.catgeoriges=res2;
    })
  }
  createProduitForm=new FormGroup( {
    name: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]}),
    categorie_name: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]}),
    prix: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]}),
    description: new FormControl<string>('',{nonNullable:true ,validators:[Validators.required ]}),
    nameArabic: new FormControl<string>('',{ nonNullable:true ,validators:[Validators.required ,Validators.maxLength(30)]}),

  } );

  showNameRequiredError=false;
  showNameRequiredError1=false;
  showNameRequiredError2=false;

  showSuccessMessage = false;
  successMessage = '';
  onFormSubmit(){
    // console.log(this.createCategorieForm.value.name);
   
 
    const produitName = this.createProduitForm.value.name;
    const produitprix = this.createProduitForm.value.prix; 
    const category_Name = this.createProduitForm.value.categorie_name; 
    const description = this.createProduitForm.value.description;  // Get the category name from the form

    // console.log('Category Name:', categoryName); // Log the category name (optional)

    if (produitName) {
      const categoryData = { name: produitName,produitprix:produitprix,category_Name:category_Name,description:description};

        this.showNameRequiredError = false; 
      // Call the addCategory method and handle the result
      // console.log('Category is there!',categoryData);
    } else {
      this.showNameRequiredError = true; 

      // console.log('product name is required!');
    }
    if (produitprix) {
      const categoryData = { name: produitName,produitprix:produitprix,category_Name:category_Name,description:description};

      this.showNameRequiredError1 = false; 
      // Call the addCategory method and handle the result
      // console.log('Category is there!',categoryData);
    } else {
      this.showNameRequiredError1 = true; 

      // console.log('product  is required!');
    }

    if (category_Name) {
      const categoryData = { name: produitName,produitprix:produitprix,category_Name:category_Name,description:description};
    this.showNameRequiredError2 = false; 
      // Call the addCategory method and handle the result
      // console.log('Category is there!',categoryData);
    } else {
      this.showNameRequiredError2 = true; 

      // console.log('Category name is required!');
    }
    if(this.showNameRequiredError1==false && this.showNameRequiredError2==false && this.showNameRequiredError==false) {
      this.showSuccessMessage = true;
      this.successMessage = 'Product added successfully!';
      this.addCategor();
      setTimeout(() => {
        this.showSuccessMessage = false;
      }, 2000);
      console.log('product added sucsussfuly!');
    }else{
      console.log('some input aare umpty !');
    }
  
  

  }
  addCategor(){
    const {value}= this.createProduitForm
    
    if (this.createProduitForm.value.name !== undefined )  {
      this.catobj.name = this.createProduitForm.value.name;
      this.catobj.categorie_name = this.createProduitForm.value.categorie_name ?? '';
     this.catobj.prix=this.createProduitForm.value.prix ?? '';
     this.catobj.description=this.createProduitForm.value.description??'';
     this.catobj.nameArabic=this.createProduitForm.value.nameArabic??'';
    } else {
      this.catobj.name = ''; // Or another default value
    }
    
    this.serviceprod.addcat(this.catobj);
    
   }
   catobj: Iproduit={
    id:'',
    name:'',
    prix:'',
    categorie_name:'',
    description:'',
    nameArabic:'',
  }
  onDeleteCategorie(id:string){
    this.serviceprod.delete(id);
      }
    
}
