import { Component, OnInit } from '@angular/core';
import { CategorieserService } from '../services/categorieser.service';
import { CategorieInterface } from '../interfaces/categorie.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ProduitservService } from '../services/produitserv.service';
import { Iproduit } from '../interfaces/iproduit';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { PopupProductUpdateComponent } from '../popup-product-update/popup-product-update.component';
@Component({
  selector: 'app-categorie',
  imports: [CommonModule],
  templateUrl: './categorie.component.html',
  styleUrl: './categorie.component.css'
})
export class CategorieComponent  implements OnInit{
  catgeoriges:CategorieInterface[]=[];
  products:Iproduit[]=[];
  filteredProducts:Iproduit[]=[];
  categoryName: string = ''; 
  constructor(private router:Router,private servicecat:CategorieserService,private serviceprod:ProduitservService,private route: ActivatedRoute,private dialogRef : MatDialog) {
  
  }


getProductsByCategory(categoryName: string) {
  return this.products.filter(prod => prod.categorie_name === categoryName);
}
// ngOnInit(): void {
//     // this.getallcategore();
//     this.serviceprod.getallproduct().subscribe((res:Iproduit[])=>{
//       console.log(res)
//       this.products =res;
//   })
//     this.route.queryParams.subscribe(params => {
//       const categoryName = params['category'];
//       console.log(categoryName);
      
//       if (categoryName) {
//         this.filteredProducts = this.getProductsByCategory(categoryName);
//       }
//     });
   
   
// }
navigateToDash(): void {
  this.router.navigate(['/dash']);  // Redirect to 'target' route
}
navigateToHome(): void {
  this.router.navigate(['/home']);  // Redirect to 'target' route
}
ngOnInit(): void {
  // First load all products
  this.serviceprod.getallproduct().subscribe((res: Iproduit[]) => {
    this.products = res;
    // console.log('All products loaded:', this.products.length);
    
    // Then check route params
    this.route.queryParams.subscribe(params => {
      this.categoryName = params['category'];
      // console.log('Category parameter:', this.categoryName);
      
      if (this.categoryName) {
        this.filteredProducts = this.getProductsByCategory(this.categoryName);
        // console.log('Filtered products:', this.filteredProducts);
      } else {
        // If no category, show all products or empty array
        this.filteredProducts = this.products; // or = []
      }
    });
  });
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
onDeleteCategorie(id:string){
  this.serviceprod.delete(id);
    }

}
