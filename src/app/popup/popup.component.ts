import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategorieserService } from '../services/categorieser.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  imports: [ReactiveFormsModule,CommonModule,],
  templateUrl: './popup.component.html',
  styleUrl: './popup.component.css'
})
export class PopupComponent {
  catobj: CategorieInterface={
    id:'',
    name:''
  }
  UpdateCategorieForm=new FormGroup( {
    name: new FormControl<string>('',{ nonNullable:true })
  } );
  
  constructor(@Inject(MAT_DIALOG_DATA) public data: { categorie: CategorieInterface },private servicecat:CategorieserService) {
    this.catobj = { ...data.categorie }; 

    console.log(data.categorie); 
  
  
  }

  OnsubmitFormUpdate(id: string): void {
    const categoryName = this.UpdateCategorieForm.value.name;
    if (this.UpdateCategorieForm.invalid) {
      console.warn('Form is invalidd');
      return;
    }
  
    const updatedData:CategorieInterface = {
      name: this.UpdateCategorieForm.value.name??'',
      id:id,

    };
    updatedData.name=this.UpdateCategorieForm.value.name??'';
    // console.log(updatedData,"ss")
    // console.log(this.UpdateCategorieForm.value.name,"so bad")
   
    this.servicecat.updatecat(id, updatedData)
      .then(() => {
        console.log('Category updated!');
        // Optionally close modal or reset form here
      })
      .catch((error) => {
        console.error('Error updating category:', error);
      });
  }
}
