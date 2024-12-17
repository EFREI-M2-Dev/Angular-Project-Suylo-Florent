import { Component, inject } from '@angular/core';
import { ProductModel } from '../../shared/models/product.model';
import { ProductService } from '../../core/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/core/services/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent {
  product: ProductModel = {} as ProductModel;
  paramId: string = '0';
  private route = inject(ActivatedRoute);

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    if (paramId) {
      this.paramId = paramId;
      this.loadProductView();
    }
  }

  loadProductView() {
    this.productService.getProductById(this.paramId).subscribe((product) => {
      this.product = product;
    });
  }

  addToCart() {
    this.cartService.addToCart(this.product).subscribe(
      (response) => {
        console.log('Produit ajouté au panier', response);
        // Tu peux aussi afficher un message de confirmation ou mettre à jour un état de panier
      },
      (error) => {
        console.error("Erreur lors de l'ajout au panier", error);
      }
    );
  }
}
