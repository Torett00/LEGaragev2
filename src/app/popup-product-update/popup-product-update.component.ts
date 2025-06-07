import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CategorieserService } from '../services/categorieser.service';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Iproduit } from '../interfaces/iproduit';
import { CommonModule } from '@angular/common';
import { ProduitservService } from '../services/produitserv.service';

@Component({
  selector: 'app-popup-product-update',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './popup-product-update.component.html',
  styleUrl: './popup-product-update.component.css'
})
export class PopupProductUpdateComponent {
  catgeoriges:CategorieInterface[]=[];

  catobj: Iproduit={
    id:'',
    name:'',
    prix:0,
    categorie_name:'',
    description:'',
    nameArabic:'',
  }

  prodconst: Iproduit={
    id:'',
    name:'',
    prix:0,
    categorie_name:'',
    description:'',
    nameArabic:'',
  }


  newprod: Iproduit={
    id:'',
    name:'',
    prix:0,
    categorie_name:'',
    description:'',
    nameArabic:'',
  }
  constructor(@Inject(MAT_DIALOG_DATA) public data: { product: Iproduit },private servicecat:CategorieserService,private serviceprod:ProduitservService,
  private dialogRef: MatDialogRef<PopupProductUpdateComponent> // Add this

  ) {
    
    this.catobj = { ...data.product }; 

    console.log(data.product); 
  
  }
  ngOnInit(): void {
    // this.getallcategore();
this.prodconst.categorie_name=this.data.product.categorie_name;
this.prodconst.name=this.data.product.name;
this.prodconst.prix=this.data.product.prix;
this.prodconst.id=this.data.product.id;  
this.prodconst.description=this.data.product.description;
this.prodconst.nameArabic=this.data.product.nameArabic
    this.servicecat.getallcat().subscribe((res2:CategorieInterface[])=>{
      // console.log(res2)
      this.catgeoriges=res2;
    })

  }

  UpdateProductForm=new FormGroup( {
    name: new FormControl<string>('',{ nonNullable:true }),
    categorie_name: new FormControl<string>('',{ nonNullable:true }),
    prix: new FormControl<string>('',{ nonNullable:true }),
    description: new FormControl<string>('',{ nonNullable:true }),
    nameArabic: new FormControl<string>('',{ nonNullable:true })


  } );
  

  OnsubmitFormUpdate(id: string): void {
    const categoryName = this.UpdateProductForm.value.name;
    if (this.UpdateProductForm.invalid) {
      console.warn('Form is invalidd');
      return;
    }
    this.newprod.id=this.prodconst.id;
    if(this.UpdateProductForm.value.name==''){
      this.newprod.name=this.prodconst.name;
    }else{
      this.newprod.name=this.UpdateProductForm.value.name??'';
    }

    if(this.UpdateProductForm.value.categorie_name==''){
      this.newprod.categorie_name=this.prodconst.categorie_name;
    }else{
      this.newprod.categorie_name=this.UpdateProductForm.value.categorie_name??'';
    }
    if(this.UpdateProductForm.value.nameArabic==''){
      this.newprod.nameArabic=this.prodconst.nameArabic;
    }
    else{
      this.newprod.nameArabic=this.UpdateProductForm.value.nameArabic??'';

    }
    if(this.UpdateProductForm.value.prix==''){
      this.newprod.prix=this.prodconst.prix;
    }else{
      this.newprod.prix = Number(this.UpdateProductForm.value.prix);
    }
    if(this.UpdateProductForm.value.description==''){
      this.newprod.description=this.prodconst.description;
    }else{
      this.newprod.description=this.UpdateProductForm.value.description??'';
    }

   
    // const updatedData:Iproduit = {
    //   id:id,
     
    //   name: this.UpdateProductForm.value.name??'',
     
    //   categorie_name:this.UpdateProductForm.value.categorie_name??'',
    //   prix: Number(this.UpdateProductForm.value.prix ?? 0)
    // };
    
    // console.log(updatedData,"ss")
    // console.log(this.UpdateCategorieForm.value.name,"so bad")
   
    this.serviceprod.updateprod(id, this.newprod)
      .then(() => {
        console.log('Category updated!');
        // Optionally close modal or reset form here
      })
      .catch((error) => {
        console.error('Error updating category:', error);
      });
  }
  closeDialog(): void {
    this.dialogRef.close();
  } 
}
