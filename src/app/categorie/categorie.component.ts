import { Component, OnInit } from '@angular/core';
import { CategorieserService } from '../services/categorieser.service';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorie',
  imports: [CommonModule],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent  implements OnInit{
  catgeoriges:CategorieInterface[]=[];
 
constructor(private categorieservice:CategorieserService){}

ngOnInit(): void {
    // this.getallcategore();

    this.categorieservice.getallcat().subscribe((res:CategorieInterface[])=>{
      console.log(res)
      this.catgeoriges=res;
    })
}

}
